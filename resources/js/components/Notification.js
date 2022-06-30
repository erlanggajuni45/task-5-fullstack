import { toast, Slide } from "react-toastify";

export const Notification = ({ type, text, delay = 3000 }) => {
    if (type === "success") {
        toast.success(text, {
            containerId: "B",
            transition: Slide,
            autoClose: delay,
            theme: "colored",
        });
    }
    if (type === "error") {
        toast.error(text, {
            containerId: "B",
            transition: Slide,
            autoClose: delay,
            theme: "colored",
        });
    }
    if (type === "dismiss") {
        toast.dismiss();
    }
};
