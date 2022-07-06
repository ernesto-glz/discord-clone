import { validateCreateFR } from 'api/validations/friend-validations';
import { FriendService } from 'api/services/friend-service';
import { AsyncRouter } from 'express-async-router';

export const router = AsyncRouter();

router.post('/', validateCreateFR, async (req, res) => {
  const { username, discriminator } = req.body;
  const { user } = res.locals;
  const friendRequest = await FriendService.create({
    from: user._id,
    discriminator,
    username
  });
  res.status(201).send(friendRequest);
});

router.put('/:requestId', async (req, res) => {
  const { user } = res.locals;
  const { requestId } = req.params;
  const result = await FriendService.accept(requestId, user._id);
  res.status(200).send(result);
});

router.delete('/:requestId', async (req, res) => {
  const { user } = res.locals;
  const { requestId } = req.params;
  const result = await FriendService.remove(requestId, user._id);
  res.status(200).send(result);
});