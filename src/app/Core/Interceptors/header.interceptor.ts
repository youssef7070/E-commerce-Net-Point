import { HttpInterceptorFn } from '@angular/common/http';

export const headerInterceptor: HttpInterceptorFn = (req, next) => {
  if(req.url.includes('cart') || req.url.includes('order')){
    req=req.clone({
      setHeaders:{
        token:localStorage.getItem('token')!
      }
    });
  }
  return next(req);
};
