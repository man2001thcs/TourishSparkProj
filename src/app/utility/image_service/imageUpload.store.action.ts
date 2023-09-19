import { Action, createAction, props, union } from '@ngrx/store';

export const storeKey = 'admin/imageList';

export const initial = createAction(`[${storeKey}] initial`);

export const getImageList = createAction(
  `[${storeKey}] getImageList`,
  props<{ payload: any }>()
);

export const getImageListSuccess = createAction(
  `[${storeKey}] getImageListSuccess`,
  props<{ response: any }>()
);

export const getImageListFailed = createAction(
  `[${storeKey}] getImageListFailed`,
  props<{ response: any }>()
);

export const getImageListSystemFailed = createAction(
  `[${storeKey}] getImageListSystemFailed`,
  props<{ error: any }>()
);

export const deleteImage = createAction(
  `[${storeKey}] deleteImage`,
  props<{ payload: any }>()
);

export const deleteImageSuccess = createAction(
  `[${storeKey}] deleteImageSuccess`,
  props<{ response: any }>()
);

export const deleteImageFailed = createAction(
  `[${storeKey}] deleteImageFailed`,
  props<{ response: any }>()
);

export const deleteImageSystemFailed = createAction(
  `[${storeKey}] deleteImageSystemFailed`,
  props<{ error: any }>()
);


export const resetImageList = createAction(
  `[${storeKey}] resetImageSystemFailed`
);

const actions = union({
  initial,

  getImageList,
  getImageListFailed,
  getImageListSystemFailed,

  deleteImage,
  deleteImageFailed,
  deleteImageSystemFailed,

  resetImageList,
});

export type ImageListUnionActions = typeof actions;
