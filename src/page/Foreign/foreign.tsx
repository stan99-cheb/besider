import { selectors } from '../../store/selectors';
import CategoryFeed from '../../components/CategoryFeed/category-feed';
import styles from './foreign.module.css';

const Foreign = () => {
  return (
    <CategoryFeed
      groupSelector={selectors.postsUI.foreignPostsGroupedByDate}
      isLoadingSelector={selectors.postsUI.isLoading}
      extraClass={styles.main}
    />
  );
}

export default Foreign;