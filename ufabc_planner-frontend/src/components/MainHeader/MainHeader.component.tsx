import usePageProps from '../../hooks/usePageProps.hook';

import styles from './MainHeader.module.scss';

const MainHeader = () => {
  const { pageProps: { title, icon: Icon } } = usePageProps();

  return (
    <div className={styles.main_header}>
      <h2><Icon />{title}</h2>

      {/* Aqui vai a imagem do usuário, o nome, e o botao de sair ?? */}
    </div>
  );
};

export default MainHeader;
