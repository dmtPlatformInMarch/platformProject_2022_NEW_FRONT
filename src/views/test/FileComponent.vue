<template>
    <div>
        <h1>FILE</h1>
        <form
            class="form-horizontal"
            method="post"
            enctype="multipart/form-data"
            @submit.prevent="submitFile"
        >
            <div
                data-name=""
                class="file-container"
                v-for="index in files"
                :key="index"
            >
                <div class="file-wrapper">
                    <input
                        type="text"
                        class="upload-name"
                        value="파일 찾기"
                        readonly
                        id="filename_0"
                    />
                    <label for="file_0" class="control-label">찾아보기</label>
                    <input
                        type="file"
                        name="files"
                        id="file_0"
                        class="upload-hidden"
                        @change="changeFilename($event)"
                    />

                    <button
                        type="button"
                        class="btn btn-bordered btn-xs visible-xs-inline visible-sm-inline visible-md-inline visible-lg-inline"
                    >
                        <i
                            @click="addFile($event)"
                            class="fa fa-plus fileI"
                            aria-hidden="true"
                        ></i>
                    </button>
                    <button
                        type="button"
                        class="btn btn-bordered btn-xs visible-xs-inline visible-sm-inline visible-md-inline visible-lg-inline"
                    >
                        <i
                            @onclick="removeFile($event)"
                            class="fa fa-minus fileI"
                            aria-hidden="true"
                        ></i>
                    </button>
                </div>
            </div>
        </form>
    </div>
</template>

<script>
export default {
    data() {
        return {
            files: [
                {
                    fileIdx: 0,
                    file: '',
                },
            ],
            fileIdx: 0,
        };
    },
    methods: {
        changeFilename(event) {
            const nameDiv =
                event.target.previousElementSibling.previousElementSibling;
            const file = event.target.files[0];
            const filename = file.name;
            console.log(filename);
            nameDiv.value = filename;
            this.files[this.fileIdx] = file;
        },
        addFile(event) {
            if (this.fileIdx > 2) {
                alert('파일은 3개까지만 입력할 수 있습니다.');
                return;
            }
            this.fileIdx += 1;
            this.files.push();
            console.log(event);
        },
        removeFile(event) {
            console.log(event);
            console.log(event.target);
        },
    },
};
</script>

<style scoped>
.file-container input[type='file'] {
    position: absolute;
    width: 1px;
    height: 1px;
    padding: 0;
    margin: -1px;
    overflow: hidden;
    clip: rect(0, 0, 0, 0);
    border: 0;
}
.file-wrapper {
    display: flex;
    width: 100%;
}
.file-container .file-wrapper label {
    color: #fff;
    background-color: #6eb6c4;
    border-color: #6eb6c4;
    display: inline-block;
    padding: 0.5em 0.75em;
    font-size: inherit;
    line-height: normal;
    vertical-align: middle;
    cursor: pointer;
    border-radius: 0.25em;
    transition: 0.4s;
}
.file-container .file-wrapper label:hover {
    background-color: #fe7763;
    border-color: #fe7763;
}

.file-container .upload-name {
    display: inline-block;
    width: 350px;
    padding: 0.5em 0.75em;
    /* label의 패딩값과 일치 */
    font-size: inherit;
    font-family: inherit;
    line-height: normal;
    vertical-align: middle;
    background-color: #f5f5f5;
    border: 1px solid #ebebeb;
    border-bottom-color: #e2e2e2;
    border-radius: 0.25em;
    -webkit-appearance: none;
    /* 네이티브 외형 감추기 */
    -moz-appearance: none;
    appearance: none;
}
.fileI:hover {
    color: #fe7763;
}
</style>
