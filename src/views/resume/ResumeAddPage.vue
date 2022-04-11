<template>
    <section class="main-content">
        <form @submit.prevent="submitResumeForm" class="my-page-wrapper active">
            <div class="my-page-title-wrapper">
                <div class="my-page-title">
                    <span>이력서 작성</span>
                </div>
            </div>
            <div class="resume-list-container">
                <div class="resume-list-header-wrapper">
                    <label for="" class="custom-label custom-label-bigger"
                        >이력서 목록
                        <span>이력서를 등록해 작업에 지원해 보세요!</span>
                    </label>
                </div>

                <div class="resume-write-container">
                    <div class="resume-write-wrapper">
                        <div class="resume-write-title">
                            <span
                                ><i class="fas fa-pen-alt"></i>이력서 제목<span
                                    class="required"
                                    >required</span
                                ></span
                            >
                            <span
                                >본인의 특징과 장점을 소개하는 제목을
                                적어보세요!</span
                            >
                        </div>
                        <div class="resume-write-content">
                            <input
                                type="text"
                                id="resume-title"
                                class="resume-title"
                                v-model="title"
                            />
                        </div>
                    </div>
                    <!-- -->
                    <div class="resume-write-wrapper">
                        <div class="resume-write-title">
                            <span
                                ><i class="fas fa-pen-alt"></i>검색 허용
                                여부<span class="required">required</span></span
                            >
                        </div>
                        <div class="resume-write-content">
                            <label class="switch-button2">
                                <input type="checkbox" v-model="isOpened" />
                                <span class="onoff-switch2"></span>
                            </label>
                        </div>
                    </div>
                    <!-- -->
                    <div class="resume-write-wrapper">
                        <div class="resume-write-title">
                            <span
                                ><i class="fas fa-pen-alt"></i>희망 분야<span
                                    class="required"
                                    >required</span
                                ></span
                            >
                            <span>희망 작업 분야를 1개 선택하세요.</span>
                        </div>
                        <div class="resume-write-content">
                            <div
                                class="resume-write-pos resume-hoped-field-pos"
                            >
                                <span>1차 분류</span>
                                <span>2차 분류</span>
                            </div>
                            <div
                                class="resume-write-pos resume-hoped-field-pos"
                                v-for="(item, index) in resumeHopedFieldDtos"
                                :key="index"
                            >
                                <div
                                    class="resume-hoped-workfield-1st resume-list-info"
                                >
                                    {{ item.firstFieldType }}
                                </div>
                                <div
                                    class="resume-hoped-workfield-2nd resume-list-info"
                                >
                                    {{ item.secondFieldType }}
                                </div>
                                <span
                                    ><a
                                        href="javascript:;"
                                        @click="
                                            deleteHopedField(
                                                item.secondFieldType,
                                            )
                                        "
                                        ><i class="fas fa-minus-circle"></i></a
                                ></span>
                            </div>
                            <div
                                class="resume-write-pos resume-hoped-field-pos"
                            >
                                <div class="selectBox hoped-field-select">
                                    <select
                                        class="select"
                                        @change="changeFirstField($event)"
                                        v-model="hopedFieldFirst"
                                    >
                                        <option disabled selected
                                            >--1차 분류--</option
                                        >
                                        <option
                                            v-for="(item, index) in firstFields"
                                            :key="index"
                                            :value="
                                                `${item.id}/${item.fieldName}`
                                            "
                                        >
                                            {{ item.fieldName }}
                                        </option>
                                    </select>
                                    <span class="icoArrow"
                                        ><i class="fas fa-chevron-down"></i
                                    ></span>
                                </div>

                                <div class="selectBox hoped-field-select">
                                    <select
                                        class="select"
                                        v-model="hopedFieldSecond"
                                    >
                                        <option disabled selected
                                            >--2차 분류--</option
                                        >
                                        <option
                                            v-for="(item,
                                            index) in secondFields"
                                            :key="index"
                                            :value="
                                                `${item.id}/${item.fieldName}`
                                            "
                                        >
                                            {{ item.fieldName }}
                                        </option>
                                    </select>
                                    <span class="icoArrow"
                                        ><i class="fas fa-chevron-down"></i
                                    ></span>
                                </div>
                                <span
                                    ><a
                                        href="javascript:;"
                                        @click="addHopedField"
                                        ><i class="fas fa-plus-circle"></i></a
                                ></span>
                            </div>
                        </div>
                    </div>
                    <!-- -->
                    <div class="resume-write-wrapper">
                        <div class="resume-write-title">
                            <span
                                ><i class="fas fa-pen-alt"></i>자기소개서<span
                                    class="required"
                                    >required</span
                                ></span
                            >
                            <span>본인을 소개하는 글을 써 보세요.</span>
                        </div>
                        <div class="resume-write-content">
                            <textarea
                                name="resume-content"
                                id="resume-content"
                                cols="30"
                                rows="10"
                                v-model="content"
                            ></textarea>
                        </div>
                    </div>
                    <!-- -->
                    <div class="resume-write-wrapper">
                        <div class="resume-write-title">
                            <span
                                ><i class="fas fa-pen-alt"></i>희망 작업
                                조건</span
                            >
                            <span>희망 작업 조건을 추가해주세요.</span>
                        </div>
                        <div class="resume-write-content">
                            <div
                                class="resume-write-pos resume-hoped-field-pos"
                            >
                                <span>희망 작업 장소</span>
                                <input
                                    type="text"
                                    placeholder="예) 재택 or 은평구 불광동 등"
                                    class="resume-certificate-grade"
                                    id="resume-certificate-grade"
                                    v-model="hopedWorkingPlace"
                                />
                            </div>
                            <div
                                class="resume-write-pos resume-hoped-field-pos"
                            >
                                <span>희망 작업 기간</span>
                                <input
                                    type="text"
                                    placeholder="예) 1주일 or 한달 등"
                                    class="resume-certificate-grade"
                                    id="resume-certificate-grade"
                                    v-model="hopedWorkingPeriod"
                                />
                            </div>
                        </div>
                    </div>
                    <!-- -->
                    <div class="resume-write-wrapper">
                        <div class="resume-write-title">
                            <span
                                ><i class="fas fa-pen-alt"></i>공인시험 /
                                자격증</span
                            >
                            <span
                                >공인 시험 성적이나 자격증 정보를 추가해
                                주세요.</span
                            >
                        </div>
                        <div class="resume-write-content">
                            <div
                                class="resume-write-pos resume-certificate-pos"
                            >
                                <span>자격증 이름</span>
                                <span>점수/등급</span>
                            </div>
                            <div
                                class="resume-write-pos resume-certificate-pos"
                                v-for="(item, index) in resumeCertificateDtos"
                                :key="index"
                            >
                                <div
                                    class="resume-list-info resume-certificate-name"
                                >
                                    {{ item.certificateName }}
                                </div>
                                <div
                                    class="resume-list-info resume-certificate-grade"
                                >
                                    {{ item.grade }}
                                </div>
                                <span
                                    ><a
                                        href="javascript:;"
                                        @click="
                                            deleteResumeCertificate(
                                                item.certificateName,
                                            )
                                        "
                                        ><i class="fas fa-minus-circle"></i></a
                                ></span>
                            </div>
                            <div
                                class="resume-write-pos resume-certificate-pos"
                            >
                                <input
                                    type="text"
                                    class="resume-certificate-name"
                                    id="resume-certificate-name"
                                    v-model="certificateName"
                                />
                                <input
                                    type="text"
                                    class="resume-certificate-grade"
                                    id="resume-certificate-grade"
                                    v-model="certificateGrade"
                                />
                                <span
                                    ><a
                                        href="javascript:;"
                                        @click="addResumeCertificate"
                                        ><i class="fas fa-plus-circle"></i></a
                                ></span>
                            </div>
                        </div>
                    </div>
                    <!-- -->
                    <div class="resume-write-wrapper">
                        <div class="resume-write-title">
                            <span><i class="fas fa-pen-alt"></i>학력/전공</span>
                            <span>학력이나 전공 상세사항을 입력해 주세요.</span>
                        </div>
                        <div class="resume-write-content">
                            <div class="resume-write-pos resume-academy-pos">
                                <span>학력</span>
                                <span>학교이름</span>
                                <span>전공</span>
                            </div>
                            <div
                                class="resume-write-pos resume-academy-pos"
                                v-for="(item, index) in resumeAcademyDtos"
                                :key="index"
                            >
                                <div
                                    class="resume-academy-course resume-list-info"
                                >
                                    {{ item.schoolType }}
                                </div>
                                <div
                                    class="resume-academy-name resume-list-info"
                                >
                                    {{ item.schoolName }}
                                </div>
                                <div
                                    class="resume-academy-major resume-list-info"
                                >
                                    {{ item.majorOrDesc }}
                                </div>
                                <span
                                    ><a
                                        href="javascript:;"
                                        @click="
                                            deleteResumeAcademy(item.schoolType)
                                        "
                                        ><i class="fas fa-minus-circle"></i></a
                                ></span>
                            </div>
                            <div class="resume-write-pos resume-academy-pos">
                                <div class="selectBox academy-select">
                                    <select class="select" v-model="schoolType">
                                        <option disabled selected
                                            >--선택하세요--</option
                                        >
                                        <option value="중학교">중학교</option>
                                        <option value="고등학교"
                                            >고등학교</option
                                        >
                                        <option value="학사">학사</option>
                                        <option value="석사">석사</option>
                                        <option value="박사">박사</option>
                                    </select>
                                    <span class="icoArrow"
                                        ><i class="fas fa-chevron-down"></i
                                    ></span>
                                </div>
                                <input
                                    type="text"
                                    class="resume-certificate-name"
                                    id="resume-certificate-name"
                                    v-model="schoolName"
                                />
                                <input
                                    type="text"
                                    class="resume-certificate-grade"
                                    id="resume-certificate-grade"
                                    v-model="majorOrDesc"
                                />
                                <span
                                    ><a
                                        href="javascript:;"
                                        @click="addResumeAcademy"
                                        ><i class="fas fa-plus-circle"></i></a
                                ></span>
                            </div>
                        </div>
                    </div>
                    <!-- -->
                    <div class="resume-write-wrapper">
                        <div class="resume-write-title">
                            <span><i class="fas fa-pen-alt"></i>능력 요소</span>
                            <span
                                >아래 리스트에서 보유하고 있는 본인의 능력을
                                추가해 주세요.</span
                            >
                        </div>
                        <div class="resume-write-content">
                            <div class="resume-write-pos resume-ability-pos">
                                <span>능력 요소</span>
                                <span>부연 설명</span>
                            </div>
                            <div
                                class="resume-write-pos resume-ability-pos"
                                v-for="(item, index) in resumeAbilityDtos"
                                :key="index"
                            >
                                <div
                                    class="resume-list-info resume-certificate-name"
                                >
                                    {{ item.abilityType }}
                                </div>
                                <div
                                    class="resume-list-info resume-certificate-grade"
                                >
                                    {{ item.desc }}
                                </div>
                                <span
                                    ><a
                                        href="javascript:;"
                                        @click="
                                            deleteResumeAbility(
                                                item.abilitySourceId,
                                            )
                                        "
                                        ><i class="fas fa-minus-circle"></i></a
                                ></span>
                            </div>
                            <div class="resume-write-pos resume-ability-pos">
                                <div class="selectBox ability-select">
                                    <select class="select" v-model="abilityId">
                                        <option disabled selected
                                            >--선택하세요--</option
                                        >
                                        <option
                                            v-for="(item,
                                            index) in abilitySources"
                                            :key="index"
                                            :value="
                                                `${item.id}/${item.abilityType}`
                                            "
                                        >
                                            {{ item.abilityType }}
                                        </option>
                                    </select>
                                    <span class="icoArrow"
                                        ><i class="fas fa-chevron-down"></i
                                    ></span>
                                </div>
                                <input
                                    type="text"
                                    class="resume-ability"
                                    id="resume-ability"
                                    v-model="abilityDesc"
                                />
                                <span
                                    ><a
                                        href="javascript:;"
                                        @click="addResumeAbility"
                                        ><i class="fas fa-plus-circle"></i></a
                                ></span>
                            </div>
                        </div>
                    </div>
                    <!-- -->
                    <div class="resume-write-wrapper">
                        <div class="resume-write-title">
                            <span
                                ><i class="fas fa-pen-alt"></i>추가 연락처</span
                            >
                            <span></span>
                        </div>
                        <div class="resume-write-content">
                            <div
                                class="resume-write-pos resume-hoped-field-pos"
                            >
                                <span>연락처 종류</span>
                                <span>연락처</span>
                            </div>
                            <div
                                class="resume-write-pos resume-hoped-field-pos"
                                v-for="(item,
                                index) in resumeAdditionalContactDtos"
                                :key="index"
                            >
                                <div class="resume-list-info">
                                    {{ item.contactType }}
                                </div>
                                <div class="resume-list-info">
                                    {{ item.contact }}
                                </div>
                                <span
                                    ><a
                                        href="javascript:;"
                                        @click="deleteContact(item.contact)"
                                        ><i class="fas fa-minus-circle"></i></a
                                ></span>
                            </div>
                            <div
                                class="resume-write-pos resume-hoped-field-pos"
                            >
                                <div class="selectBox contact-select">
                                    <select
                                        class="select"
                                        v-model="contactType"
                                    >
                                        <option disabled selected
                                            >--선택하세요--</option
                                        >
                                        <option
                                            v-for="(item,
                                            index) in contactTypes"
                                            :key="index"
                                            :value="
                                                `${item.id}/${item.contactType}`
                                            "
                                        >
                                            {{ item.contactType }}
                                        </option>
                                    </select>
                                    <span class="icoArrow"
                                        ><i class="fas fa-chevron-down"></i
                                    ></span>
                                </div>
                                <input
                                    type="text"
                                    class="resume-ability"
                                    id="resume-ability"
                                    v-model="contact"
                                />
                                <span
                                    ><a href="javascript:;" @click="addContact"
                                        ><i class="fas fa-plus-circle"></i></a
                                ></span>
                            </div>
                        </div>
                    </div>

                    <div class="resume-confirm-wrapper">
                        <button :disabled="!isFormValid" type="submit">
                            이력서 생성
                        </button>
                    </div>
                </div>
            </div>
        </form>
    </section>
</template>

<script>
import { fetchAllField } from '@/api/project';
import {
    fetchAllAbilitySources,
    fetchAllContactTypes,
    createResume,
} from '@/api/resume';

export default {
    data() {
        return {
            title: '',
            content: '',
            resumeAbilityDtos: [],
            resumeAcademyDtos: [],
            resumeCertificateDtos: [],
            resumeHopedFieldDtos: [],
            resumeAdditionalContactDtos: [],
            createdBy: '',
            isOpened: true,
            hopedWorkingPeriod: '',
            hopedWorkingPlace: '',
            allFields: [],
            firstFields: [],
            secondFields: [],
            abilitySources: [],
            contactTypes: [],
            /* ability */
            abilityId: '',
            abilityDesc: '',
            abilityType: '',
            /* certificate */
            certificateName: '',
            certificateGrade: '',
            /* academy */
            schoolType: '',
            schoolName: '',
            majorOrDesc: '',
            /* hopedField */
            hopedFieldFirst: '',
            hopedFieldSecond: '',
            hopedFieldCnt: 0,
            /* contact */
            contactType: '',
            contact: '',
        };
    },
    created() {
        this.createdBy = this.$store.getters.getUsername;
        this.fetchData();
    },
    computed: {
        isFormValid() {
            return (
                this.title &&
                this.content &&
                this.resumeHopedFieldDtos.length !== 0
            );
        },
    },
    methods: {
        async fetchData() {
            try {
                const data1 = await fetchAllField();
                this.allFields = data1.data;
            } catch (error) {
                console.log(error);
            }
            try {
                const data2 = await fetchAllAbilitySources();
                this.abilitySources = data2.data;
            } catch (error) {
                console.log(error);
            }
            try {
                const data3 = await fetchAllContactTypes();
                this.contactTypes = data3.data;
            } catch (error) {
                console.log(error);
            }
            this.allFields.forEach(element => {
                if (element.depth === 1) {
                    this.firstFields.push(element);
                }
            });
        },
        changeFirstField(event) {
            console.log('event : ' + event.target.value);
            let data = event.target.value.split('/');
            this.secondFields.splice(0);
            this.allFields.forEach(element => {
                if (element.depth === 2 && element.parentId === data[0] * 1) {
                    this.secondFields.push(element);
                }
            });
        },
        addResumeAbility() {
            console.log('add ability');
            if (this.abilityId !== '' && this.abilityDesc !== '') {
                console.log('this');
                let abilityValue = this.abilityId.split('/');
                let newAbility = {
                    abilitySourceId: abilityValue[0],
                    abilityType: abilityValue[1],
                    desc: this.abilityDesc,
                };
                this.resumeAbilityDtos.push(newAbility);

                this.abilityId = '';
                this.abilityDesc = '';
            }
        },
        deleteResumeAbility(data) {
            console.log('data : ' + data);
            for (let i = 0; i < this.resumeAbilityDtos.length; i++) {
                console.log(this.resumeAbilityDtos[i].abilitySourceId);
                if (this.resumeAbilityDtos[i].abilitySourceId === data) {
                    this.resumeAbilityDtos.splice(i, 1);
                    i--;
                }
            }
        },
        addResumeCertificate() {
            if (this.certificateName !== '' && this.certificateGrade !== '') {
                let newCertificate = {
                    certificateName: this.certificateName,
                    grade: this.certificateGrade,
                };
                this.resumeCertificateDtos.push(newCertificate);

                this.certificateName = '';
                this.certificateGrade = '';
            }
        },
        deleteResumeCertificate(data) {
            console.log('data : ' + data);
            for (let i = 0; i < this.resumeCertificateDtos.length; i++) {
                console.log(this.resumeCertificateDtos[i].certificateName);
                if (this.resumeCertificateDtos[i].certificateName === data) {
                    this.resumeCertificateDtos.splice(i, 1);
                    i--;
                }
            }
        },
        addResumeAcademy() {
            if (this.schoolType !== '' && this.schoolName !== '') {
                let newAcademy = {
                    schoolType: this.schoolType,
                    schoolName: this.schoolName,
                    majorOrDesc: this.majorOrDesc,
                };
                this.resumeAcademyDtos.push(newAcademy);

                this.schoolType = '';
                this.schoolName = '';
                this.majorOrDesc = '';
            }
        },
        deleteResumeAcademy(data) {
            console.log('data : ' + data);
            for (let i = 0; i < this.resumeAcademyDtos.length; i++) {
                console.log(this.resumeAcademyDtos[i].schoolType);
                if (this.resumeAcademyDtos[i].schoolType === data) {
                    this.resumeAcademyDtos.splice(i, 1);
                    i--;
                }
            }
        },
        addHopedField() {
            if (this.hopedFieldCnt >= 1) {
                alert('희망 작업 분야는 이력서 당 한 개만 등록할 수 있습니다!');
                return;
            }
            if (this.hopedFieldFirst !== '' && this.hopedFieldSecond !== '') {
                let hopedFieldFirstVal = this.hopedFieldFirst.split('/');
                let hopedFieldSecondVal = this.hopedFieldSecond.split('/');
                let newHopedField = {
                    firstFieldId: hopedFieldFirstVal[0],
                    firstFieldType: hopedFieldFirstVal[1],
                    secondFieldId: hopedFieldSecondVal[0],
                    secondFieldType: hopedFieldSecondVal[1],
                };
                this.resumeHopedFieldDtos.push(newHopedField);
                this.hopedFieldFirst = '';
                this.hopedFieldSecond = '';
                this.hopedFieldCnt += 1;
            }
        },
        deleteHopedField(data) {
            console.log('data : ' + data);
            for (let i = 0; i < this.resumeHopedFieldDtos.length; i++) {
                console.log(this.resumeHopedFieldDtos[i].secondFieldType);
                if (this.resumeHopedFieldDtos[i].secondFieldType === data) {
                    this.resumeHopedFieldDtos.splice(i, 1);
                    i--;
                }
            }
            --this.hopedFieldCnt;
        },
        addContact() {
            if (this.contactType !== '' && this.contact !== '') {
                let contactTypeValue = this.contactType.split('/');
                let newContact = {
                    contactTypeId: contactTypeValue[0],
                    contactType: contactTypeValue[1],
                    contact: this.contact,
                };
                this.resumeAdditionalContactDtos.push(newContact);
                this.contactType = '';
                this.contact = '';
            }
        },
        deleteContact(data) {
            console.log('data : ' + data);
            for (let i = 0; i < this.resumeAdditionalContactDtos.length; i++) {
                console.log(this.resumeAdditionalContactDtos[i].contact);
                if (this.resumeAdditionalContactDtos[i].contact === data) {
                    this.resumeAdditionalContactDtos.splice(i, 1);
                    i--;
                }
            }
        },
        async submitResumeForm(event) {
            event.preventDefault();
            console.log('form submit event: ' + event);
            try {
                const resume = {
                    title: this.title,
                    content: this.content,
                    resumeAbilityDtos: this.resumeAbilityDtos,
                    resumeAcademyDtos: this.resumeAcademyDtos,
                    resumeCertificateDtos: this.resumeCertificateDtos,
                    resumeHopedFieldDtos: this.resumeHopedFieldDtos,
                    resumeAdditionalContactDtos: this
                        .resumeAdditionalContactDtos,
                    createdBy: this.createdBy,
                    opened: this.isOpened,
                    hopedWorkingPeriod: this.hopedWorkingPeriod,
                    hopedWorkingPlace: this.hopedWorkingPlace,
                };
                console.log('resume : ' + resume);
                const { data } = await createResume(resume);
                console.log(data);
                this.$router.push('/resume/mine');
            } catch (error) {
                console.log(error);
            }
        },
    },
};
</script>

<style></style>
