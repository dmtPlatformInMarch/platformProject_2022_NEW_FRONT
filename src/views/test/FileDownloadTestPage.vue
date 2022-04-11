<template>
    <div>
        <h1>FILE</h1>
        <div>
            <a href="javascript:;" @click="downloadFile">파일 다운로드</a>
        </div>
    </div>
</template>

<script>
import { downloadFile } from '@/api/file';

export default {
    methods: {
        async downloadFile() {
            const id = 101;
            try {
                const data = await downloadFile(id);
                console.log('data');
                console.log(data);
                const fileURL = window.URL.createObjectURL(
                    new Blob([data.data], {
                        type: data.headers['content-type'],
                    }),
                );
                let fileName = data.headers.pragma;
                fileName = decodeURI(fileName);
                const fileLink = document.createElement('a');
                fileLink.href = fileURL;
                fileLink.setAttribute('download', `${fileName}`);
                document.body.appendChild(fileLink);

                fileLink.click();
            } catch (error) {
                console.log('error :' + error);
            }
        },
    },
};
</script>

<style></style>
