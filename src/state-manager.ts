import { useEffect, useState } from 'react';

type Observable<T> = T & {
    subscribe : (cb : any) => void;
}

export function createObservable<T>(obj: T) : Observable<T> {

    let subscribers = new Set();

    return new Proxy({
        ...obj,
        subscribe: (cb) => subscribers.add(cb)
    }, {
        set: (target, prop, value) => {
            Reflect.set(target, prop, value);
            
            subscribers.forEach((cb : any) => cb());

            return true;
        }
    })
}

export function useSelector<T>(store : Observable<T>){
    const [version, setVersion] = useState(0);

    useEffect(() => {
        store.subscribe(() => setVersion(prev => prev + 1));
    }, [store]);

    return store;
}

export function useDispatch<T>(store : Observable<T>){

    return (prop: keyof T, payload: any) => {
        store[prop] += payload;
    };
}