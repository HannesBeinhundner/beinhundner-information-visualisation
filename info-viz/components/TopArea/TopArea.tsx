import Link from "next/link";
import Image from "next/image";
import LogoDarkImg from '@/images/logo.svg';
import styles from "./TopArea.module.scss";

const steps = [
    { label: 'Submission Exposé', date: '26.04.2024' },
    { label: 'Entry in Portfolio', date: '26.07.2024' },
    { label: 'Update Portfolio', date: '20.08.2024' },
    { label: 'Project fixation', date: '31.08.2024' },
];

const stepLabelStyle = {
    ".mui-5340bo-MuiStepLabel-label.MuiStepLabel-alternativeLabel": {
        marginTop: 0.75,
        fontSize: 13,
    },
};

export default function TopArea() {
    return (
        <div className={styles.container}>
            <Image
                src={LogoDarkImg}
                alt="TeamConnect Logo"
                width={100}
                height={50}
            />
            <h1 className={styles.headline}>CyberCrime Monitor</h1>
        </div>
    );
}
