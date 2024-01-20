import withAuth from '../../../common/withAuth';
import NaturePrestation from './NaturePrestation';
import TypeMission from './TypeMission';
import TypePrestation from './TypePrestation';
const Ecran = () => {
    return (
        <div>
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3">
                <TypeMission />
                <TypePrestation />
                <NaturePrestation />
            </div>
        </div>
    );
};

export default withAuth(Ecran);
