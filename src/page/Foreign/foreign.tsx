import { selectors } from '../../store/selectors';
import CategoryFeed from '../../components/CategoryFeed/category-feed';

const Foreign = () => {
  return (
    <CategoryFeed
      groupSelector={selectors.postsUI.foreignPostsGroupedByDate}
      isLoadingSelector={selectors.postsUI.isLoading}
    />
  );
}

export default Foreign;