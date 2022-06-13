import SubscriptionModel from '../models/SubscriptionModel';
import useAxios from './AxiosHook';

const SubscriptionService = {
  useAllSubscriptions: (userid: number): [SubscriptionModel[], string, () => void] => {
    const [response, error, loading, refetch] = useAxios(`/users/${userid}/subscriptions`, 'GET');

    return [response?.datas || [], loading, refetch];
  },
};

export default SubscriptionService;
