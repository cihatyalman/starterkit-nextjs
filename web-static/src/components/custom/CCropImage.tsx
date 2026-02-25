"use client"
// npm i react-easy-crop

import { useCallback, useState } from "react";
import Cropper from "react-easy-crop";
import { Button } from "../ui/button";
import { Slider } from "../ui/slider";
import { showToast } from "@/core/helperx/toast";
import { getDeviceInfo } from "@/core/helpers";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
} from "../ui/dialog";
import { DialogTitle } from "@radix-ui/react-dialog";
import { Loader2 } from "lucide-react";

const MAX_FILE_SIZE = 10 * 1024 * 1024; // 10MB

interface CCropImageProps {
  aspect?: number;
  children: React.ReactElement;
  callback?: (preview: string, file: File | null) => void;
}

export const CCropImage = ({
  aspect = 1,
  children,
  callback,
}: CCropImageProps) => {
  const [imageSrc, setImageSrc] = useState<string | null>(null);
  const [croppedAreaPixels, setCroppedAreaPixels] = useState<MyAny>(null);
  const [open, setOpen] = useState(false);
  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);
  const [rotation, setRotation] = useState(0.01);
  const [loading, setLoading] = useState(false);
  const [fileMeta, setFileMeta] = useState<{
    name: string;
    type: string;
    lastModified: number;
  } | null>(null);

  // Resmi alır sonra crop popup açar.
  const onFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (file.size > MAX_FILE_SIZE) {
      showToast({ message: "Lütfen 10MB altında bir görsel yükleyin." });
      return;
    }

    setFileMeta({
      name: file.name,
      type: file.type,
      lastModified: file.lastModified,
    });

    if (e.target) e.target.value = "";
    setZoom(1);
    setTimeout(() => setRotation((r) => (r === 0 ? 0.01 : 0)), 300);

    const reader = new FileReader();
    reader.onload = () => {
      setImageSrc(reader.result as string);
      setOpen(true);
    };
    reader.readAsDataURL(file);
  };

  // Crop alanındaki görseli alır
  const onCropComplete = useCallback((_: MyAny, croppedAreaPixels: MyAny) => {
    setCroppedAreaPixels(croppedAreaPixels);
  }, []);

  async function showCroppedImage() {
    if (!imageSrc || !croppedAreaPixels || !fileMeta) return;
    setLoading(true);
    try {
      const croppedFile = await getCroppedImg(
        imageSrc,
        croppedAreaPixels,
        fileMeta
      );

      const blobUrl = URL.createObjectURL(croppedFile);
      callback?.(URL.createObjectURL(croppedFile), croppedFile);
      URL.revokeObjectURL(blobUrl);

      setOpen(false);
    } catch (err) {
      console.error(err);
      showToast({ message: "Görsel kırpılırken bir hata oluştu." });
    } finally {
      setLoading(false);
    }
  }

  const isMobile = getDeviceInfo("device") === "mobile";

  return (
    <div>
      <div
        onChange={(e) => {
          const input = e.target as HTMLInputElement;
          if (input && input.type === "file" && input.files?.length) {
            onFileChange(e as MyAny);
          }
        }}
      >
        {children}
      </div>
      {open && <div className="fixed inset-0 z-100 bg-black/50" />}
      <Dialog open={open} onOpenChange={setOpen} modal={false}>
        <DialogContent className="[&>button.absolute]:hidden z-200 overflow-hidden p-3 w-full max-h-[80vh] max-w-[90vw]">
          <DialogHeader className="text-left">
            <DialogTitle className="font-bold text-lg">
              Fotoğraf Düzenleyici
            </DialogTitle>
            <DialogDescription className="hidden"></DialogDescription>
          </DialogHeader>
          <div className="overflow-hidden pb-3 max-h-[60vh]">
            <div className="relative h-75 sm:h-85 w-full bg-white">
              {imageSrc && (
                <Cropper
                  image={imageSrc}
                  crop={crop}
                  zoom={zoom}
                  rotation={rotation}
                  aspect={aspect}
                  onCropChange={setCrop}
                  onCropComplete={onCropComplete}
                  onZoomChange={setZoom}
                />
              )}
            </div>
            {!isMobile && (
              <div className="space-y-2 px-1">
                <label className="text-sm">Yakınlaştır</label>
                <Slider
                  min={1}
                  max={3}
                  step={0.1}
                  value={[zoom]}
                  onValueChange={(v) => setZoom(v[0])}
                  className="mt-1"
                />
              </div>
            )}
          </div>
          <DialogFooter className="flex flex-row justify-end">
            <Button
              variant="outline"
              className="w-fit min-w-30 font-bold"
              onClick={() => setOpen?.(false)}
            >
              Vazgeç
            </Button>
            <Button
              className="w-fit min-w-30 font-bold bg-(--color-primary) hover:bg-(--color-primary-light)"
              onClick={showCroppedImage}
            >
              {loading ? (
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              ) : (
                "Kırp"
              )}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

async function getCroppedImg(
  imageSrc: string,
  crop: { x: number; y: number; width: number; height: number },
  fileMeta: { name: string; type: string; lastModified: number }
): Promise<File> {
  const image = await createImage(imageSrc);
  const canvas = document.createElement("canvas");
  const ctx = canvas.getContext("2d");
  if (!ctx) throw new Error("Canvas context bulunamadı");

  canvas.width = crop.width;
  canvas.height = crop.height;

  ctx.drawImage(
    image,
    crop.x,
    crop.y,
    crop.width,
    crop.height,
    0,
    0,
    crop.width,
    crop.height
  );

  return new Promise((resolve, reject) => {
    canvas.toBlob(
      (blob) => {
        if (!blob) return reject(new Error("Blob oluşturulamadı"));
        const file = new File([blob], fileMeta.name, {
          type: fileMeta.type,
          lastModified: fileMeta.lastModified,
        });
        resolve(file);
      },
      fileMeta.type,
      0.9
    );
  });
}

function createImage(url: string): Promise<HTMLImageElement> {
  return new Promise((resolve, reject) => {
    const image = new Image();
    image.src = url;
    image.crossOrigin = "anonymous";
    image.onload = () => resolve(image);
    image.onerror = (err) => reject(err);
  });
}
