import { redirect } from "next/navigation";
import TopArea from "@/components/TopArea/TopArea";
import MainArea from "@/components/MainArea/MainArea";
import CasesAustriaCard from "@/components/CasesAustriaCard/CasesAustriaCard";
import FormsCasesAustriaCard from "@/components/FormsCasesAustriaCard/FormsCasesAustriaCard";
import WorldStatisticsCard from "@/components/WorldStatisticsCard/WorldStatisticsCard";
import styles from "@/styles/dashboard.module.scss";

export default async function Dashboard() {
    
    return (
        <div className={styles.container}>
            <div className={styles.topArea}>
                <TopArea />
            </div>
            <div className={styles.mainArea}>
                <MainArea
                    topLeftComponent={<CasesAustriaCard />}
                    topRightComponent={<FormsCasesAustriaCard />}
                    centerComponent={<WorldStatisticsCard />} // Pass the new big card component here
                    bottomLeftComponent={<WorldStatisticsCard />} // Assuming this is the component you want
                    bottomRightComponent={<CasesAustriaCard />} // Another component for the right side
                />
            </div>
        </div>
    );
}