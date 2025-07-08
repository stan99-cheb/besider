import { useEffect, useState } from "react";

type Param = (url: string, callback: (url: string) => Promise<boolean>) => { isImage: boolean }

const useImage: Param = (url, callback) => {
  const [isImage, setIsImage] = useState(false);

  useEffect(() => {
    let isMounted = true;

    void (async (isMounted) => {
      try {
        setIsImage(await callback(url));
      } catch {
        if (isMounted) setIsImage(false);
      }
    })(isMounted);

    return () => {
      isMounted = false;
    };
  }, [callback, url]);

  return {
    isImage
  };
}

export default useImage;