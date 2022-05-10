import clsx from 'clsx';
import { IconBaseProps } from 'react-icons';

import { Loader } from '../Loader';

import styles from './IconButton.module.scss';

interface Props {
  icon: React.ComponentType<IconBaseProps>;
  btnType?: 'standard' | 'primary' | 'info' | 'error';
  onClick: () => void;
  loading?: boolean;
}

const IconButton = ({ icon: Icon, btnType = 'standard', onClick, loading = false }: Props) => {
  return (
    <div className={clsx(styles.icon_button, styles[btnType])} onClick={onClick}>
      {loading ? <Loader /> : <Icon size={20} />}
    </div>
  );
};

export default IconButton;
