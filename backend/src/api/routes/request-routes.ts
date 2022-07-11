import { validateCreateFR } from 'api/validations/request-validations';
import { RequestService } from 'api/services/request-service';
import { AsyncRouter } from 'express-async-router';

export const router = AsyncRouter();

router.post('/', validateCreateFR, async (req, res) => {
  const { username, discriminator } = req.body;
  const { user } = res.locals;
  const friendRequest = await RequestService.create({
    selfUser: user,
    from: user.id,
    discriminator,
    username
  });
  res.status(201).send(friendRequest);
});

router.put('/:requestId', async (req, res) => {
  const { user } = res.locals;
  const { requestId } = req.params;
  const result = await RequestService.accept(requestId, user.id);
  res.status(200).send(result);
});

router.delete('/:requestId', async (req, res) => {
  const { user } = res.locals;
  const { requestId } = req.params;
  const result = await RequestService.remove(requestId, user.id);
  res.status(200).send(result);
});
