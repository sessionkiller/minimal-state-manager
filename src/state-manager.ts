import { useEffect, useState } from 'react';

type ObservableMessage<T> = {
    target: T;
    prop: string;
}

type Observable<T> = T & {
    subscribe : (cb : (data : ObservableMessage<T>) => void) => void;
}

export function createObservable<T>(obj: T) : Observable<T> {

    let subscribers = new Set();

    return new Proxy({
        ...obj,
        subscribe: (cb) => subscribers.add(cb)
    }, {
        set: (target, prop, value) => {
            Reflect.set(target, prop, value);

            console.log(target, prop, value);
            

            subscribers.forEach((cb : any) => cb({
                target,
                prop
            }));

            return true;
        }
    })
}

export function useSelector<T>(store : Observable<T>){
    const [, setVersion] = useState(0);

    useEffect(() => {
        store.subscribe(() => setVersion(prev => prev + 1));
    }, [store]);

    return store;
}