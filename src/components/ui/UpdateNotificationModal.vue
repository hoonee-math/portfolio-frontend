<template>
    <div v-if="isVisible" class="modal-overlay" @click="closeModal">
        <div class="modal-content" @click.stop>
            <div class="modal-header">
                <h3 class="modal-title">
                    <span class="update-icon">🎉</span>
                    업데이트 안내
                </h3>
                <button class="modal-close" @click="closeModal">&times;</button>
            </div>
            
            <div class="modal-body">
                <div class="update-content">
        
                    <!-- 날짜별 업데이트 그룹 반복 -->
                    <div v-for="(group, groupIndex) in updateGroups" :key="groupIndex" class="update-group">
                        <div class="update-date">{{ group.date }}</div>
                        
                        <div class="update-list">
                            <div v-for="(update, index) in group.items" :key="index" class="update-item">
                                <span class="update-badge" :class="update.type">{{ getBadgeText(update.type) }}</span>
                                <span class="update-text">{{ update.text }}</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            
            <div class="modal-footer">
                <label class="dont-show-today">
                    <input 
                        type="checkbox" 
                        v-model="dontShowToday" 
                        @change="handleDontShowChange"
                    >
                    <span class="checkmark"></span>
                    오늘 하루 열지 않기
                </label>
                
                <div class="modal-actions">
                    <button class="btn-confirm" @click="closeModal">
                        확인
                    </button>
                </div>
            </div>
        </div>
    </div>
</template>

<script lang="ts">
import { defineComponent, ref, onMounted } from 'vue';

interface UpdateItem {
    type: 'new' | 'improvement' | 'fix';
    text: string;
}

interface UpdateGroup {
    date: string;
    items: UpdateItem[];
}

export default defineComponent({
    name: 'UpdateNotificationModal',
    setup() {
        const isVisible = ref(false);
        const dontShowToday = ref(false);

        // 기존 단일 업데이트에서 배열로 변경
        const updateGroups = ref<UpdateGroup[]>([
            {
                date: '2025.06.01',
                items: [
                    { type: 'improvement', text: 'Nginx 보안 업데이트 완료\nSecurityHeaders.com A등급 달성' }
                ]
            },
            {
                date: '2025.05.27',
                items: [
                    { type: 'improvement', text: '업데이트 내역 모달 스크롤 개선, UI/UX 개선' }
                ]
            },
            {
                date: '2025.05.26',
                items: [
                    { type: 'new', text: '업데이트 내역 모달 컴포넌트 추가' },
                    { type: 'new', text: 'PDF 다운로드 가능\nPDF 에는 더 많은 정보가 포함되어 있습니다' },
                    { type: 'improvement', text: '프로젝트 상세 모달에 이미지 슬라이더 기능 추가' },
                    { type: 'improvement', text: '아키텍처 및 주요 기능 소개 섹션 추가' }
                ]
            }
        ]);

        // 배지 텍스트 반환
        const getBadgeText = (type: string): string => {
            switch (type) {
                case 'new': return 'NEW';
                case 'improvement': return 'IMPROVED';
                case 'fix': return 'FIX';
                default: return 'UPDATE';
            }
        };

        // 오늘 날짜 문자열 생성 (YYYY-MM-DD 형식)
        const getTodayString = (): string => {
            const today = new Date();
            return today.toISOString().split('T')[0];
        };

        // 모달을 보여줄지 체크
        const checkShouldShow = (): boolean => {
            const lastHiddenDate = localStorage.getItem('updateModal_lastHidden');
            const todayString = getTodayString();
            console.log("lastHiddenDate:", lastHiddenDate, "todayString:", todayString);
            // 오늘 하루 열지 않기가 체크되어 있고, 오늘 날짜와 같다면 표시하지 않음
            if (lastHiddenDate === todayString) {
                return false;
            }
            
            // 이미 본 업데이트인지 체크 // 최신 업데이트 그룹의 날짜와 항목 수로 버전 키 생성
            const latestGroup = updateGroups.value[0]; // 첫 번째가 최신
            const currentUpdateKey = `${latestGroup.date}_${latestGroup.items.length}`;
            const lastSeenUpdate = localStorage.getItem('updateModal_lastSeen');
            
            return true; //lastSeenUpdate !== currentUpdateKey;
        };

        // "오늘 하루 열지 않기" 체크박스 변경 처리
        const handleDontShowChange = () => {
            if (dontShowToday.value) {
                const todayString = getTodayString();
                localStorage.setItem('updateModal_lastHidden', todayString);
            } else {
                localStorage.removeItem('updateModal_lastHidden');
            }
        };

        // 모달 닫기
        const closeModal = () => {
            // 현재 업데이트를 본 것으로 표시 // 최신 업데이트 그룹 기준으로 본 것으로 표시
            const latestGroup = updateGroups.value[0]; // 첫 번째가 최신
            const currentUpdateKey = `${latestGroup.date}_${latestGroup.items.length}`;
            localStorage.setItem('updateModal_lastSeen', currentUpdateKey);
            
            isVisible.value = false;
        };

        // 컴포넌트 마운트 시 실행
        onMounted(() => {
            // 약간의 지연 후 모달 표시 (페이지 로딩 완료 후)
            setTimeout(() => {
                if (checkShouldShow()) {
                    isVisible.value = true;
                }
            }, 1000);
        });

        return {
            isVisible,
            dontShowToday,
            updateGroups,
            getBadgeText,
            handleDontShowChange,
            closeModal
        };
    }
});
</script>

<style lang="scss" scoped>
@use '@/assets/styles/variables' as vars;

.modal-overlay {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: rgba(0, 0, 0, 0.6);
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 9999;
    padding: 20px;
    backdrop-filter: blur(3px);
}

.modal-content {
    background-color: white;
    border-radius: 16px;
    width: 90%;
    max-width: 500px;
    max-height: 80vh;
    // overflow-y: auto;
    box-shadow: 0 20px 60px rgba(0, 0, 0, 0.3);
    animation: modalAppear 0.3s ease-out;
    display: flex;
    flex-direction: column;
}

@keyframes modalAppear {
    from {
        opacity: 0;
        transform: scale(0.9) translateY(-20px);
    }
    to {
        opacity: 1;
        transform: scale(1) translateY(0);
    }
}

.modal-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 24px 24px 16px;
    border-bottom: 1px solid #eee;
    flex-shrink: 0;  // 줄어들지 않게

    .modal-title {
        font-size: 1.4rem;
        font-weight: 600;
        color: vars.$text-color;
        margin: 0;
        display: flex;
        align-items: center;
        gap: 8px;

        .update-icon {
            font-size: 1.2rem;
        }
    }

    .modal-close {
        background: none;
        border: none;
        font-size: 28px;
        cursor: pointer;
        color: vars.$gray-400;
        width: 32px;
        height: 32px;
        display: flex;
        align-items: center;
        justify-content: center;
        border-radius: 50%;
        transition: all 0.2s;

        &:hover {
            background-color: vars.$gray-100;
            color: vars.$gray-600;
        }
    }
}

.modal-body {
    padding: 16px 24px;
    flex: 1;
    overflow-y: auto;
    min-height: 0;     // flex 아이템이 줄어들 수 있게 추가
    //max-height: 400px;  // 본문 높이 제한
    //overflow-y: auto;   // 본문만 스크롤
}

.update-group {
    margin-bottom: 24px;
    
    &:last-child {
        margin-bottom: 0;
    }
}

.update-date {
    background: linear-gradient(45deg, vars.$primary-color, vars.$secondary-color);
    color: white;
    padding: 6px 12px;
    border-radius: 20px;
    font-size: 0.85rem;
    font-weight: 500;
    display: inline-block;
    margin-bottom: 20px;
}

.update-content {
    h4 {
        font-size: 1.1rem;
        margin-bottom: 16px;
        color: vars.$text-color;
        font-weight: 600;
    }
}

.update-list {
    margin-bottom: 20px;
}

.update-item {
    display: flex;
    align-items: center;
    gap: 12px;
    margin-bottom: 12px;
    padding: 8px 0;

    .update-badge {
        padding: 4px 8px;
        border-radius: 12px;
        font-size: 0.7rem;
        font-weight: 600;
        text-transform: uppercase;
        letter-spacing: 0.5px;
        min-width: 60px;
        text-align: center;

        &.new {
            background-color: #e3f2fd;
            color: #1976d2;
        }

        &.improvement {
            background-color: #f3e5f5;
            color: #7b1fa2;
        }

        &.fix {
            background-color: #ffebee;
            color: #d32f2f;
        }
    }

    .update-text {
        color: vars.$gray-700;
        line-height: 1.5;
        flex: 1;
        white-space: pre-line;
    }
}

.update-note {
    background-color: #f8f9fa;
    padding: 16px;
    border-radius: 8px;
    border-left: 4px solid vars.$primary-color;

    p {
        margin: 0;
        color: vars.$gray-600;
        font-size: 0.9rem;
        line-height: 1.5;
    }
}

.modal-footer {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 16px 24px 24px;
    border-top: 1px solid #eee;
    flex-shrink: 0;  // 줄어들지 않게
}

.dont-show-today {
    display: flex;
    align-items: center;
    cursor: pointer;
    font-size: 0.9rem;
    color: vars.$gray-600;
    user-select: none;

    input[type="checkbox"] {
        position: absolute;
        opacity: 0;
        cursor: pointer;
    }

    .checkmark {
        position: relative;
        height: 16px;
        width: 16px;
        background-color: #fff;
        border: 2px solid vars.$gray-300;
        border-radius: 3px;
        margin-right: 8px;
        transition: all 0.2s;

        &::after {
            content: '';
            position: absolute;
            display: none;
            left: 4px;
            top: 1px;
            width: 4px;
            height: 8px;
            border: solid white;
            border-width: 0 2px 2px 0;
            transform: rotate(45deg);
        }
    }

    input:checked ~ .checkmark {
        background-color: vars.$primary-color;
        border-color: vars.$primary-color;

        &::after {
            display: block;
        }
    }

    &:hover .checkmark {
        border-color: vars.$primary-color;
    }
}

.modal-actions {
    .btn-confirm {
        background: linear-gradient(45deg, vars.$primary-color, vars.$secondary-color);
        color: white;
        border: none;
        padding: 10px 24px;
        border-radius: 8px;
        cursor: pointer;
        font-weight: 500;
        font-size: 0.95rem;
        transition: all 0.2s;

        &:hover {
            transform: translateY(-1px);
            box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
        }
    }
}

/* 반응형 디자인 */
@media (max-width: 768px) {
    .modal-content {
        width: 95%;
        margin: 10px;
    }

    .modal-header {
        padding: 20px 20px 16px;
        
        .modal-title {
            font-size: 1.2rem;
        }
    }

    .modal-body {
        padding: 20px 16px;
    }

    .modal-footer {
        padding: 16px 20px 20px;
        flex-direction: column;
        gap: 16px;
        align-items: stretch;

        .modal-actions {
            width: 100%;

            .btn-confirm {
                width: 100%;
                padding: 12px;
            }
        }
    }

    .update-item {
        //flex-direction: column;
        //align-items: flex-start;
        gap: 8px;

        .update-badge {
            align-self: flex-start;
        }
    }
}
</style>