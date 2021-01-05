import Cropper from "cropperjs";
import "cropperjs/dist/cropper.css";
import Compressor from "compressorjs";
import FileUpload from "vue-upload-component";
import draggable from "vuedraggable";
import exifr from "exifr";
import {mapState} from "vuex";
import bSpinner from "../../../components/OverLayLoading.vue";

export default {
  name: "uploadImg",
  props: {
    value: Array,
    isPanoramic: {
      type: Boolean,
      default: false
    },
    hasMain: {
      type: Boolean,
      default: false
    },
    hasSetButton: {
      type: Boolean,
      default() {
        return this.hasMain
      }
    },
    photosExtensions: String,
    photosAccept: String,
    name: {
      default: "file",
      type: String
    }
  },
  components: {
    FileUpload,
    draggable,
    bSpinner
  },
  data() {
    return {
      isUploading: false,
      files: [],
      accept: "image/png,image/gif,image/jpeg,image/webp",
      extensions: "gif,jpg,jpeg,png,webp",
      minSize: 1,
      size: 1024 * 1024 * 10,
      multiple: true,
      directory: false,
      drop: true,
      addIndex: false,
      thread: 1,
      postAction: `https://leenexport.com/api/v1/media/upload`,
      headers: {
        "X-Csrf-Token": "xxxx"
      },
      data: {
        _csrf_token: "xxxxxx"
      },
      autoCompress: 10024 * 10024,
      uploadAuto: true,
      isOption: false,
      editFile: {
        show: false,
        name: ""
      },
    };
  },
  computed: {
    ...mapState(["isLoading"]),
    dragOptions() {
      return {
        animation: 500,
        disabled: false
      };
    },
    createdData() {
      return this.value
    }

  },
  watch: {
    value:function (newValue){
      this.files = newValue;
    },

    files: function (newVal) {
      this.onInputChange(newVal);
      let active = this.files.filter(x => x.active == true).length > 0;
      if (active !== this.isUploading) {
        this.isUploading = active;
        this.$store.commit("loading", active);
      }
    },
    "editFile.show"(newValue, oldValue) {
      // when close
      if (!newValue && oldValue) {
        this.$refs.upload.update(this.editFile.id, {error: this.editFile.error || ""});
      }

      // When open
      if (newValue) {
        this.$nextTick(function () {
          if (!this.$refs.editImage) {
            return;
          }
          if (this.isPanoramic) {
            let cropper = new Cropper(this.$refs.editImage, {
              autoCrop: false,
              viewMode: 1
            });
            this.editFile = {
              ...this.editFile,
              cropper
            };
            this.editFile.disable();
          } else {
            let cropper = new Cropper(this.$refs.editImage, {
              autoCrop: true,
              viewMode: 1,
              aspectRatio: 3 / 2,
              autoCropArea: 1
            });
            this.editFile = {
              ...this.editFile,
              cropper
            };
          }
        });
      }
    },
  },
  methods: {
    showSetButton(index) {
      if (this.hasMain && index === 0) return false
      return this.hasSetButton
    },
    clear() {
      if (this.isPanoramic) {
        this.editFile.cropper.setDragMode("move");
        this.editFile.cropper.clear();
      }
    },
    onInputChange(newVal) {
      //let mappedValues = newVal.map(v => {return {path: v.path, id: v.id ,order: v.order}});
      // this.unwatchIsLiveProp();
      this.$emit('input', newVal);
    },
    async fillPhotos(photos) {
      this.$refs.upload.clear();
      for (let photo of photos) {
        this.$refs.upload.add({
          id: photo.id,
          path: photo.path,
         // order: photo.order,
          fileObject: true,
          size: 57055,
          name: "api",
          type: "image/jpeg",
          active: false,
          isValid: true,
          error: "",
          success: true,
          postAction: `https://leenexport.com/api/v1/media/upload`,
          timeout: 0,
          file: {},
          response: {
            id: photo.id,
            path: photo.path,
            test: 'test'
          },
          progress: "100.00",
          speed: 57346,
          data: {
            _csrf_token: "xxxxxx"
          },
          headers: {
            "X-Csrf-Token": "xxxx"
          },
          //blob: URL.createObjectURL(blob),
          //thumb: URL.createObjectURL(blob),
          xhr: {}
        });
      }
      for (let photo of photos) {

        let oo = this.$refs.upload.get(photo.id);
       // await fetch(this.$vRoute.imageUrl(photo.path, 'sd'))
        await fetch(this.$vRoute.imageUrl(photo.path))
          .then(res => res.blob())
          .then(i => {
            oo.blob = URL.createObjectURL(i);
            oo.thumb = URL.createObjectURL(i);
            this.$refs.upload.update(photo.id, oo);
          })

      }
    },
    inputFilter(newFile, oldFile, prevent) {
      // add new image
      if (newFile && !oldFile) {
        if (/(\/|^)(Thumbs\.db|desktop\.ini|\..+)$/.test(newFile.name)) {
          return prevent();
        }

        // Filter php html js file
        // php html js
        if (/\.(php5?|exe?|html?|jsx?)$/i.test(newFile.name)) {
          return prevent();
        }
        // Automatic compression
        if (
          !this.isPanoramic &&
          newFile.file &&
          newFile.type.substr(0, 6) === "image/" &&
          this.autoCompress > 0 &&
          this.autoCompress < newFile.size
        ) {
          newFile.error = "compressing";
          let Compressor1 = new Compressor(null, {
            convertSize: Infinity,
            maxWidth: 2512,
            maxHeight: 512
          });
          Compressor1.compress(newFile.file)
            .then(file => {
              this.$refs.upload.update(newFile, {
                error: "",
                file,
                size: file.size,
                type: file.type
              });
            })
            .catch(err => {
              this.$refs.upload.update(newFile, {error: err.message || "compress"});
            });
        }
      }
      // create blob !! update??
      if (newFile && (!oldFile || newFile.file !== oldFile.file)) {
        if (!newFile.path) {
          // Create a blob field
          newFile.blob = "";
          let URL = window.URL || window.webkitURL;
          if (URL && URL.createObjectURL) {
            newFile.blob = URL.createObjectURL(newFile.file);
          }
          // Thumbnails
          newFile.thumb = "";
          if (newFile.blob && newFile.type.substr(0, 6) === "image/") {
            newFile.thumb = newFile.blob;
          }
        }


      }
    },
    // add, update, remove File Event
    inputFile(newFile, oldFile) {
      if (newFile && oldFile) {
        // update
        if (newFile.active && !oldFile.active) {
          console.log("start upload new file", newFile);

          // beforeSend
          // EXIF Check If Panoramic
          console.log('newFile', newFile)
          if (this.isPanoramic) {
            exifr
              .parse(newFile.file, {xmp: true})
              .then(function (x) {
                if (x && x.ProjectionType === "equirectangular") {
                  newFile.isValid = true;
                } else {
                  newFile.isValid = false;
                  this.$refs.upload.remove(newFile);
                  this.$bvToast.toast(" ليست بانورمية", {
                    title: "الصورة ليست بانورامية",
                    variant: "danger",
                    solid: true,
                    toaster: "b-toaster-bottom-right"
                  });
                }
              })

              .catch(x => {
                console.log("xxxxxxxxxxxxxxx", x);
                newFile.isValid = false;
                this.$refs.upload.remove(newFile);
                this.$bvToast.toast(" ليست بانورمية", {
                  title: "الصورة ليست بانورامية",
                  variant: "danger",
                  solid: true,
                  toaster: "b-toaster-bottom-right"
                });
              });
          }
          // min size
          if (newFile.size >= 0 && this.minSize > 0 && newFile.size < this.minSize) {
            this.$refs.upload.update(newFile, {error: "size"});
          }
        }
        if (newFile.progress !== oldFile.progress) {
          // progress
        }
        if (newFile.error && !oldFile.error) {
          // error
        }
        if (newFile.success && !oldFile.success) {
          // success
        }
      }

      if (!newFile && oldFile) {
        // remove
        if (oldFile.success && oldFile.response.id) {
          // $.ajax({
          //   type: 'DELETE',
          //   url: '/upload/delete?id=' + oldFile.response.id,
          // })
        }
      }
      // Automatically activate upload
      if (Boolean(newFile) !== Boolean(oldFile) || oldFile.error !== newFile.error) {
        if (!this.$refs.upload.active) {
          this.$refs.upload.active = true;
        }
      }
    },
    onEditFileShow(file) {
      this.editFile = {...file, show: true};
      this.$refs.upload.update(file, {error: "edit"});
    },
    onDeleteFile(file) {
      this.$refs.upload.remove(file);
    },
    // on edit file (Crop)
    onEditorFile() {
      if (!this.$refs.upload.features.html5) {
        this.editFile.show = false;
        return;
      }

      let data = {
        name: this.editFile.name,
        file: null,
        size: 0,
        active: true,
        success: false,
        progress: 0,
        show: false,
        error: ""
      };

      if (this.editFile.cropper) {
        let binStr = atob(
          this.editFile.cropper
            .getCroppedCanvas()
            .toDataURL(this.editFile.type)
            .split(",")[1]
        );
        let arr = new Uint8Array(binStr.length);
        for (let i = 0; i < binStr.length; i++) {
          arr[i] = binStr.charCodeAt(i);
        }
        data.file = new File([arr], data.name, {type: this.editFile.type});
        data.size = data.file.size;
      }
      this.$refs.upload.active = true;
      this.$refs.upload.update(this.editFile.id, data);


      this.editFile.show = false;
    },
    setMain(index) {
      this.files.splice(0, 0, this.files.splice(index, 1)[0]);
      this.$emit('set-main')
    },
    rotateImage(deg) {
      this.editFile.cropper.clear();
      let containerData = this.editFile.cropper.getContainerData();
      this.editFile.cropper.rotate(deg);
      let canvasData = this.editFile.cropper.getCanvasData();
      let heightOld = canvasData.height;
      let heightNew = containerData.height;
      let koef = heightNew / heightOld;
      let widthNew = canvasData.width * koef;
      canvasData.height = heightNew;
      canvasData.width = widthNew;
      canvasData.top = 0;
      if (canvasData.width >= containerData.width) {
        canvasData.left = 0;
        canvasData.width = containerData.width;
        canvasData.top = (containerData.height - heightOld) / 2;
      } else {
        canvasData.left = (containerData.width - canvasData.width) / 2;
      }
      this.editFile.cropper.setCanvasData(canvasData);
    }
  },
  created() {
    // this.unwatchIsLiveProp = this.$watch('value', (newVal) => {
    //   if (newVal) {
    //     this.fillPhotos(newVal)
    //     // this.unwatchIsLiveProp();
    //   }
    // });
  }
};
