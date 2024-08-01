import { useEffect } from 'react';
import { useRouter } from 'next/router';
import jwt from 'jsonwebtoken';
import { NextPage } from 'next';
import { useToast } from '@/components/Toast';
import Cookies from 'js-cookie';

const withAdminAuth = (WrappedComponent: NextPage) => {
  const AdminAuthHOC: NextPage = (props) => {
    const router = useRouter();
    const { showToast } = useToast();

    useEffect(() => {
      const token = Cookies.get('d873670505a04af075d077431f094515')
      if (!token) {
        showToast('Anda harus login untuk mengakses halaman ini.', 'error');
        router.replace('/admin/login');
        return;
      }

      try {
        const decodedToken = jwt.decode(token);
        if (!decodedToken || typeof decodedToken === 'string') {
          throw new Error('Invalid token format');
        }

        const { exp, pengurusDesaAnggotaId } = decodedToken as { exp: number; pengurusDesaAnggotaId: number };

        if (Date.now() >= exp * 1000) {
          showToast('Sesi Anda telah berakhir. Silakan login kembali.', 'error');
          localStorage.removeItem('token');
          router.replace('/admin/login');
          return;
        }

        if (!pengurusDesaAnggotaId) {
          showToast('Anda tidak memiliki izin untuk mengakses halaman ini.', 'error');
          router.replace('/admin/login');
          return;
        }
      } catch (error) {
        showToast('Terjadi kesalahan saat memverifikasi sesi Anda. Silakan login kembali.', 'error');
        localStorage.removeItem('token');
        router.replace('/admin/login');
      }
    }, [router, showToast]);

    return <WrappedComponent {...props} />;
  };

  return AdminAuthHOC;
};

export default withAdminAuth;
