import Link from "next/link";
import styles from "./page.module.css";
interface ButtonsI {
  name: string;
  url: string;
  id: string;
}

const buttons: ButtonsI[] = [
  { name: "Pages", id: "1", url: "/pages" },
  { name: "Price Plans", id: "2", url: "/priceplans" },
  { name: "Products", id: "3", url: "/products" },
];

export default function Home() {
  return (
    <div className={styles.page}>
      <div className={styles.button_menu}>
        {buttons.map((item: ButtonsI) => (
          <Link className={styles.links} href={item.url} key={item.id}>
            {item.name}
          </Link>
        ))}
      </div>
    </div>
  );
}
