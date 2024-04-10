import { redirect } from "next/navigation";
import TopArea from "@/components/TopArea/TopArea";
import MainArea from "@/components/MainArea/MainArea";
import CasesAustriaCard from "@/components/CasesAustriaCard/CasesAustriaCard";
import FormsCasesAustriaCard from "@/components/FormsCasesAustriaCard/FormsCasesAustriaCard";
import WorldStatisticsCard from "@/components/WorldStatisticsCard/WorldStatisticsCard";
import ReportedClarifiedCard from "@/components/ReportedClarifiedCard/ReportedClarifiedCard";
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
                    centerComponent={<ReportedClarifiedCard />}
                    bottomComponent={<WorldStatisticsCard />}
                />
            </div>
        </div>
    );
}