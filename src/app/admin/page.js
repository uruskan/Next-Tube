import AddVideo from "./components/AddVideo";
import MassAdder from "./components/MassAdder.js";
import styles from "./styles/AdminPage.module.css";

export default function Admin(){
    return(
        <main className={styles.adminMain}>
            <AddVideo />
            <MassAdder />
        </main>
    );
}
