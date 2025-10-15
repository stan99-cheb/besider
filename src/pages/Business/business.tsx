import { selectors } from '../../store/selectors';
import CategoryFeed from '../../components/CategoryFeed/category-feed';
// import styles from './business.module.css';

const Business = () => {
  return (
    <CategoryFeed
      groupSelector={selectors.postsUI.businessPostsGroupedByDate}
      isLoadingSelector={selectors.postsUI.isLoading}
    />
  );
}

export default Business;