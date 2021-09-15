import Swal from "sweetalert2";

export default class Wallet {

    static get(t, wallet) {
        if(!wallet.connected) {
            Swal.fire({
                title: "Connect to a wallet",
                text: ``
            })
        }
    }
}