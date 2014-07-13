class Utils {

    public static generateRandomUUID():string {

        var CHARS:string[] = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz'.split('');
        var chars = CHARS,
            uuid = ['','','','','','','','','-','','','','','-','4','','','','-','','','','','-','','','','','','','','','','','',''],
            i = 36,
            rnd = 0,
            r;
    
        while (i--) {
          if (uuid[i] === '') {
            if (rnd <= 0x02) {
              rnd = 0x2000000 + (Math.random() * 0x1000000) | 0;
            }
            r = rnd & 0xf;
            rnd = rnd >> 4;
            uuid[i] = chars[(i === 19) ? (r & 0x3) | 0x8 : r];
          }
        }
    
        return uuid.join('');
      }
}