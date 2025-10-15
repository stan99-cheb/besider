import { selectors } from '../../store/selectors';
import CategoryFeed from '../../components/CategoryFeed/category-feed';

const General = () => {
  return (
    <CategoryFeed
      groupSelector={selectors.postsUI.postsGroupedByDate}
      isLoadingSelector={selectors.postsUI.isLoading}
    />
  );
}

export default General;