import { selectors } from '../../store/selectors';
import CategoryFeed from '../../components/CategoryFeed/category-feed';

const Science = () => {
  return (
    <CategoryFeed
      groupSelector={selectors.postsUI.sciencePostsGroupedByDate}
      isLoadingSelector={selectors.postsUI.isLoading}
    />
  );
}

export default Science;