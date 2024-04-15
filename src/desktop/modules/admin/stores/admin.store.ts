import type {
    Condition,
    Recommendation,
} from '@desktop/modules/admin/types/recommendations.js';
import type { DataTableCellEditCompleteEvent } from 'primevue/datatable';
import type { Questions } from '../types/questions';
import { computed, ref } from 'vue';
import { defineStore } from 'pinia';
import {
    createRecommendation,
    createDiseaseRecommendation,
    deleteRecommendation,
    deleteDiseaseRecommendation,
    getDiseases,
    getQuestionsJson,
    getDiseasesQuestionsJson,
    getRecommendationDetailData,
    getDiseaseRecommendationDetailData,
    getRecommendations,
    getDiseaseRecommendations,
    updateRecommendation,
    updateDiseaseRecommendation,
} from '../services/admin.refbooks';
import { success } from '@/utils/toast.js';
import { useDialog } from 'primevue/usedialog';

import CreateConditions from '../components/popup/CreateConditions.vue';

export const useAdminStore = defineStore('admin', () => {
    const allRecommendations = ref<Recommendation[]>([]);
    const allDiseases = ref<Recommendation[]>([]);
    const selectedRecommendation = ref<Recommendation | null>();
    const questions = ref<Questions[]>([]);
    const conditions = ref<Condition[] | any[]>([]); // TODO: исправить типизацию
    const selectedCondition = ref<Condition>();
    const questionsNames = ref<{ value: string }[]>([]);
    const conditionIndex = ref(0);
    const isLoading = ref(false);
    const vals = ref<any[]>([]); // TODO: исправить типизацию

    const tests = ref(<{ [key: string]: Record<string, string> }>{});
    const lastTestKey = ref(1);
    const recomindationDeleteName = ref('');
    const recomindationNewName = ref('');

    const dialog = useDialog();

    const conditionColumns = [
        {
            header: 'Наименование вопроса',
            field: 'questionName',
            hasDropdown: true,
            options: computed(() => questionsNames.value),
        },
        {
            header: 'Условие',
            field: 'compare',
            hasDropdown: true,
            options: [
                { value: 'exact' },
                { value: 'except' },
                { value: 'greater' },
                { value: 'less' },
                { value: 'range' },
                { value: 'optional' },
            ],
        },
        {
            header: 'Значение',
            field: 'value',
            hasDropdown: false,
            options: [],
        },
        {
            header: 'Номер рекомендации',
            field: 'testCase',
            hasDropdown: false,
            options: [],
        },
        {
            header: 'Удаление',
            field: '',
            hasDropdown: false,
            options: [],
        },
    ];

    async function getQuestionsData(diseaseId?: string): Promise<void> {
        isLoading.value = true;

        let res;
        if (diseaseId) {
            res = await getDiseasesQuestionsJson(diseaseId);
        } else {
            res = await getQuestionsJson();
        }

        if (res) {
            const data = diseaseId
                ? res.data.data[res.data.data.length - 1]
                : res.data;
            const pages = diseaseId
                ? data.attributes.name.content.pages
                : data.pages;
            const elements = [];
            const names = [];
            const test = [];

            for (let i = 0; i < pages.length; i++) {
                const element = pages[i];
                elements.push(element.elements);

                for (let j = 0; j < element.elements.length; j++) {
                    const item = element.elements[j];

                    names.push({ value: item.name });
                    test.push(item);
                }
            }

            questions.value = elements;
            questionsNames.value = names;
            vals.value = test;
            isLoading.value = false;
        }
    }

    async function getRecommendationsData(diseaseId?: string): Promise<void> {
        let res;

        if (diseaseId) {
            res = await getDiseaseRecommendations(diseaseId);
        } else {
            res = await getRecommendations();
        }

        if (res) {
            allRecommendations.value = res.data.data;
        }
    }

    async function getDiseasesData(): Promise<void> {
        const res = await getDiseases();

        if (res) {
            allDiseases.value = res.data.data;
        }
    }

    async function getRecommendationDetail(
        Recommendation: any,
        diseaseId?: string
    ) {
        if (!Recommendation?.id) return;

        let res;

        if (diseaseId) {
            res = await getDiseaseRecommendationDetailData(
                Recommendation?.id,
                diseaseId
            );
        } else {
            res = await getRecommendationDetailData(Recommendation?.id);
        }

        if (res) {
            tests.value = res.data.data.attributes.tests;

            const keys = Object.keys(tests.value);

            lastTestKey.value = keys[keys.length - 1]
                ? Number(keys[keys.length - 1]) + 1
                : 1;

            conditions.value = res.data.data.attributes.conditions;
        }
    }

    function updateCondition(
        event: DataTableCellEditCompleteEvent,
        tableIndex: number
    ): void {
        const updated = { ...event.newData };

        if (typeof updated.value === 'string') {
            updated.value = updated.value.split(',');
        }

        if (event.newValue && event.value !== event.newValue) {
            conditions.value[tableIndex][event.index] = { ...updated };
        }
    }

    function deleteCondition(indexToDelete: number): void {
        conditions.value = conditions.value.filter(
            (_: any, index: number) => index !== indexToDelete
        );

        success(
            'Удаление блока условии',
            'Блок условии удален, не забудьте сохранить'
        );
    }

    function createBlockCondition() {
        conditions.value.push([] as any);
    }

    function createConditionItem(index: number): void {
        conditionIndex.value = index;
        dialog.open(CreateConditions, {
            props: {
                header: 'Создание нового условия для блока',
                style: {
                    width: '60%',
                },
                modal: true,
            },
        });
    }

    function deleteConditionItem(tableIndex: number): void {
        const filteredConditions: any = (
            conditions.value[tableIndex] as unknown as Condition[]
        ).filter((item) => item !== selectedCondition.value);

        conditions.value[tableIndex] = filteredConditions;

        success('Удаление условия', 'Условие удалено, не забудьте сохранить');
    }

    async function createRecommendationData(diseaseId?: string): Promise<void> {
        let res;

        if (diseaseId) {
            res = await createDiseaseRecommendation(
                recomindationNewName.value,
                diseaseId
            );
        } else {
            res = await createRecommendation(recomindationNewName.value);
        }

        if (res) {
            allRecommendations.value.push(res.data.data);
            recomindationNewName.value = '';
        }
    }

    async function deleteRecommendationData(diseaseId?: string): Promise<void> {
        const foundedObject = allRecommendations.value.find(
            (item) => item.attributes.name === recomindationDeleteName.value
        );
        let res;

        if (diseaseId) {
            res = await deleteDiseaseRecommendation(
                foundedObject?.id,
                diseaseId
            );
        } else {
            res = await deleteRecommendation(foundedObject?.id);
        }

        if (res) {
            allRecommendations.value = allRecommendations.value.filter(
                (item) => item.id !== foundedObject?.id
            );

            success('Удаление рекоминдации', res.data.message);
            recomindationDeleteName.value = '';
            selectedRecommendation.value = null;
        }
    }

    async function updateRecommendationData(diseaseId?: string): Promise<void> {
        let res;

        if (diseaseId) {
            res = await updateDiseaseRecommendation(
                selectedRecommendation.value?.id,
                selectedRecommendation.value?.attributes.name,
                tests.value,
                conditions.value,
                diseaseId
            );
        } else {
            res = await updateRecommendation(
                selectedRecommendation.value?.id,
                selectedRecommendation.value?.attributes.name,
                tests.value,
                conditions.value
            );
        }

        if (res) {
            success('Изменения рекоминдации', 'Все изменения сохранены');
        }
    }

    function deleteTest(deleteKey: string): void {
        delete tests.value[deleteKey];

        const keys = Object.keys(tests.value);
        const sortedKeys = keys.sort((a: any, b: any) => a - b);
        const newObj: Record<string, Record<string, string>> = {};

        for (let i = 0; i < sortedKeys.length; i++) {
            newObj[i + 1] = tests.value[sortedKeys[i]];
        }

        tests.value = newObj;
        const newKeys = Object.keys(tests.value);
        lastTestKey.value = newKeys[newKeys.length - 1]
            ? Number(newKeys[newKeys.length - 1]) + 1
            : 1;

        success('Удаление теста', 'Тест удален, не забудьте сохранить');
    }

    function createTest(): void {
        tests.value[`${lastTestKey.value}`] = {
            title: '',
            recommendation: '',
        };

        lastTestKey.value++;
    }

    return {
        allRecommendations,
        allDiseases,
        selectedRecommendation,
        tests,
        conditions,
        selectedCondition,
        questions,
        lastTestKey,
        recomindationDeleteName,
        recomindationNewName,
        questionsNames,
        conditionColumns,
        conditionIndex,
        vals,
        isLoading,
        getQuestionsData,
        getRecommendationsData,
        getRecommendationDetail,
        updateCondition,
        deleteCondition,
        createBlockCondition,
        deleteConditionItem,
        createConditionItem,
        createRecommendationData,
        deleteRecommendationData,
        updateRecommendationData,
        deleteTest,
        createTest,
        getDiseasesData,
    };
});
