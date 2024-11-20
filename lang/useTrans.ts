import { useRouter } from 'next/router'
import en from './en'
import vi from './vi'
import bi from './bi'

export const useTrans = () => {
    const { locale } = useRouter();

    let trans = bi;

    switch (locale) {
        case 'vi':
            trans = vi;
            break;
        case 'en':
            trans = en;
            break;
        case 'bi':
        default:
            trans = bi;
            break;
    }

    return trans;
};  
export default useTrans
