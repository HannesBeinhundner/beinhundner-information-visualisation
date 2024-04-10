import Image from "next/image";
import LogoDarkImg from '@/images/logo.svg';
import styles from "./TopArea.module.scss";
import InfoIcon from '@mui/icons-material/Info';

export default function TopArea() {
    return (
        <div className={styles.headerContent}>
            <div className={styles.container}>
                <Image
                    src={LogoDarkImg}
                    alt="Cybercrime Monitor Logo"
                    width={100}
                    height={50}
                />
                <h1 className={styles.headline}>CyberCrime Monitor</h1>
            </div>
            <a
                href="https://bundeskriminalamt.at/306/start.aspx"
                target="_blank"
                rel="noopener noreferrer"
                className={styles.container}
            >
                <h5>Get information on protection against cybercrime</h5>
                <InfoIcon/>
            </a>
        </div>
    );
}
