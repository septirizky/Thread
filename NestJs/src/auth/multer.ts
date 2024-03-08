import { diskStorage } from 'multer';

const allowedFileExtensions = ['jpg', 'png', 'JPG', 'PNG', 'jpeg'];
const filefilteroption = (req: any, file: any, cb: any) => {
  const ext = file.originalname.split('.').pop();
  const fileSize = 1 * 1024 * 1024;
  const cekExt = /.pdf|.exe/i;
  if (file.originalname.match(cekExt)) {
    req.errorvalidatefile = 'Tidak boleh .pdf atau .exe';
    return cb(null, false);
  }
  if (allowedFileExtensions.includes(ext)) {
    if (req.headers['content-length'] > fileSize) {
      req.errorvalidatefile = 'Hanya boleh dibawah 1Mb';
      return cb(null, false);
    } else {
      cb(null, true);
    }
  } else {
    req.errorvalidatefile = 'Hanya boleh image';
    return cb(null, false);
  }
};

export const MulterOption = {
  storage: diskStorage({
    destination: './assets',
    filename: function (req, file, cb) {
      const configsufix = Math.round(Math.random() * 1e9);
      const ext = file.originalname.split('.').pop();
      cb(null, file.fieldname + configsufix + '.' + ext);
    },
  }),
  fileFilter: filefilteroption,
};
