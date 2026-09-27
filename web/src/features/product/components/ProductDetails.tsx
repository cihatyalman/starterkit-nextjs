import { ProductModel } from "../models/product.model";

export const ProductDetails = (props: { product: ProductModel }) => {
  return (
    <div className="flex flex-col gap-1 flex-1 p-4">
      <p className="font-semibold text-lg sm:text-2xl">{props.product.title}</p>
      <p className="text-muted-foreground text-sm sm:text-base">
        {props.product.description}
      </p>
      <p className="text-muted-foreground text-sm sm:text-base mt-10">
        Lorem ipsum dolor sit amet consectetur, adipisicing elit. Eius similique
        veniam placeat doloremque maiores, reprehenderit consequatur quis ad
        inventore deserunt perferendis impedit aliquam veritatis quam voluptatem
        fugit est voluptas, a, dolore vitae cumque esse quisquam! Id dolores
        velit amet suscipit ex mollitia error, a aperiam minus cumque distinctio
        sunt architecto? Magnam soluta quasi neque dolorum alias et hic
        veritatis voluptates possimus, sint vitae, minus pariatur laborum
        tempora fugit dolorem non ratione. Magni, expedita est! In natus facilis
        explicabo eius earum omnis ea est inventore. Minus facere, debitis
        explicabo, corporis totam iusto, atque deserunt praesentium nobis
        placeat fuga modi eveniet error consectetur molestias mollitia esse?
        Asperiores soluta molestias corporis, amet, quaerat dignissimos
        praesentium vero commodi iusto enim, ducimus reprehenderit. Eum sed
        deserunt, sequi consequuntur impedit enim nesciunt tempore officiis
        ipsum cum consequatur, voluptas aut. Velit eligendi exercitationem eius
        facere inventore illo, ipsam dolorum, voluptate eum autem fuga possimus
        animi est quod hic quasi cupiditate quibusdam iusto distinctio!
        Similique perspiciatis quae earum ipsa ratione eveniet molestias fugiat
        quidem deleniti rem totam cupiditate harum ipsam, ad et facere minus
        quis debitis libero voluptatum nesciunt animi blanditiis dignissimos
        officiis? Reiciendis veritatis officia nam corrupti aliquam veniam et
        dolores dolorem incidunt perspiciatis amet aspernatur eos cupiditate
        consequatur est ipsum sunt, eius voluptatibus eveniet nihil sint
        ducimus? Et atque ullam laborum voluptate, quo deleniti, repudiandae
        recusandae consequatur provident debitis reprehenderit harum
        exercitationem enim? Sit aspernatur neque minus possimus dicta
        assumenda, atque provident sed, nulla veritatis amet soluta perferendis
        voluptatum, culpa rem exercitationem recusandae nam aliquam repellendus
        quasi doloremque. Explicabo nihil sit fugiat vero aut omnis culpa
        doloremque cum libero. Saepe quas placeat quam itaque rerum, vitae a
        soluta eum nesciunt sequi modi maxime quos voluptas et dignissimos
        reiciendis autem expedita repellat velit! Dolore esse reiciendis nostrum
        sit quis! Voluptatibus, nisi doloremque error reiciendis ratione porro
        fugiat numquam fuga quaerat sunt vel consequuntur vitae facilis iure
        veniam laudantium optio doloribus, corporis voluptatem? Illo cupiditate
        labore nostrum voluptatum debitis perspiciatis, laboriosam tenetur
        temporibus harum ipsum commodi, minus eveniet doloremque explicabo
        assumenda dolorum vel rerum provident? Reiciendis quis laudantium
        pariatur hic, id voluptates modi a assumenda omnis. Laborum, unde
        placeat eligendi ex similique praesentium neque tempore. Aspernatur
        sequi distinctio alias voluptate autem officiis eveniet cum incidunt
        magni, nostrum culpa amet, maxime impedit labore dolorum fugiat eius
        sint iure facere officia, excepturi hic odio! Error, et aspernatur
        soluta quaerat nam iste, cum deleniti obcaecati non voluptatibus aut
        similique perferendis aperiam minus impedit aliquid sequi odio. Dolorem
        nostrum laudantium omnis itaque, aliquid expedita provident. Dicta
        accusamus, exercitationem vel asperiores illum, velit aliquid sequi
        culpa odit fugit corrupti. Corrupti suscipit sed veniam, fuga culpa
        pariatur quasi rerum nulla adipisci cumque non cum, libero asperiores
        voluptatibus ipsa optio architecto tempore dolore corporis a impedit
        incidunt. Accusamus beatae labore quis quam culpa quasi voluptates iusto
        cupiditate officiis delectus dolorem voluptate doloremque vel aperiam,
        impedit nemo veniam quia asperiores! Iusto fugiat aut qui est,
        necessitatibus explicabo nesciunt? Voluptates, omnis minus! Veniam,
        totam fuga alias numquam, eum laborum illum recusandae aspernatur quos
        nemo dolorum itaque consequatur?
      </p>
    </div>
  );
};
