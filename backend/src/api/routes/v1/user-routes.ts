import { AsyncRouter } from 'express-async-router';
import { ApiRoutes } from 'config/constants/api-routes';
import { UserService } from 'api/services/user-service';

const router = AsyncRouter();

router.get(ApiRoutes['USER']['GET_USER'], async (req, res) => {
  const { userId } = req.params;
  const userInfo = await UserService.getUser(userId);
  res.status(200).send(userInfo);
});

router.get(ApiRoutes['USER']['GET_SELF'], async (req, res) => {
  const selfUser = res.locals;
  const result = await UserService.getUser(selfUser._id);
  res.status(200).send(result);
});

export default router;
