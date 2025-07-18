import { selectors } from '../../store/selectors';
import CategoryFeed from '../../components/CategoryFeed/category-feed';
import styles from './science.module.css';

const Science = () => {
  return (
    <CategoryFeed
      groupSelector={selectors.postsUI.sciencePostsGroupedByDate}
      isLoadingSelector={selectors.postsUI.isLoading}
      extraClass={styles.main}
    />
  );
}

export default Science;