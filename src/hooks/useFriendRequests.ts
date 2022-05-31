import { useEffect, useState } from 'react';
import { PendingRequest } from 'src/models/friend.model';
import { FriendService } from 'src/services/friend.service';
import { UserService } from 'src/services/user.service';
import useFetchAndLoad from './useFetchAndLoad';

type RequestType = 'Incoming' | 'Outgoing';

const useFriendRequests = () => {
  const [pendingRequests, setPendingRequests] = useState<PendingRequest[]>([]);
  const [outgoingRequests, setOutgoingRequests] = useState<PendingRequest[]>(
    []
  );
  const { callEndpoint } = useFetchAndLoad();
  const [isLoading, setIsLoading] = useState(true);

  const fetchRequests = async (type: RequestType) => {
    const isIncoming = type === 'Incoming';

    const { data } = await callEndpoint(
      isIncoming
        ? FriendService.getPendingRequests()
        : FriendService.getOutgoingRequests()
    );

    if (!data?.length) {
      isIncoming ? setPendingRequests(data) : setOutgoingRequests(data);
      return;
    }

    const result: PendingRequest[] = await Promise.all(
      data.map(async (request: PendingRequest) => {
        const { data: userData } = await callEndpoint(
          UserService.getUserInfo(isIncoming ? request.from : request.to)
        );
        return isIncoming
          ? { ...request, fromUser: userData }
          : { ...request, toUser: userData };
      })
    );
    isIncoming ? setPendingRequests(result) : setOutgoingRequests(result);
  };

  const fetchAllRequests = async () => {
    await fetchRequests('Incoming');
    await fetchRequests('Outgoing');
    return;
  };

  useEffect(() => {
    fetchAllRequests().finally(() => setIsLoading(false));
  }, []);

  return {
    isLoading,
    pendingRequests,
    outgoingRequests,
    fetchAllRequests
  };
};

export default useFriendRequests;
