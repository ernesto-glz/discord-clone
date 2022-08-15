import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';
import { Store } from 'types/store';

export const useAppDispatch = () => useDispatch<any>();
export const useAppSelector: TypedUseSelectorHook<Store.AppState> = useSelector;
