
import PageOverlay from '../components/PageOverlay';
import './login.css'
import accueil from '../assets/mcovision2.svg'
export default function Root() {
    return (
        <PageOverlay image={accueil} title={'test'} desc={'Login'}>
            <button></button>
        </PageOverlay>
    );
  }