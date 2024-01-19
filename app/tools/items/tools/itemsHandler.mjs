import {Minimizer300} from "../minimizer300.mjs";
import {Gondonfedi} from "../gondonfedi.mjs";

export async function handleItem(item, size, user) {
    switch (item.name) {
        case "Уменьшатор 3000":
            const minimizer = new Minimizer300()
            return minimizer.useItem(item, size)
        case "Гондон Феди":
            const condom = new Gondonfedi()
            return condom.useItem(user, item)
    }
}