import withAdminAuth from "@/utils/withAdminAuth";
import BeritaPage from "@/pages/admin/berita";

const Dashboard = () => {
    return <BeritaPage/>
};

export default withAdminAuth(Dashboard);