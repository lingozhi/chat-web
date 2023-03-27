import Loadable from '@loadable/component';
import Loading from '@/components/loading';

const Test = Loadable(() => import('@/pages/test'), {
    fallback: <Loading />,
});
export const routes = [
    {
        path: '/*',
        element: <Test />,
    },
];
