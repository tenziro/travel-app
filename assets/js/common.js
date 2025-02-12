
document.addEventListener('DOMContentLoaded', () => {
	// * 모달 컨트롤
	const handleModal = (modalName) => {
		const bodyWrap = document.querySelector('body');
		const modal = document.querySelector(`.modal[data-modal-name="${modalName}"]`);
		const modalContents = modal.querySelector('.modal-contents');
		let touchStartY = 0;
		const handleTouchStart = (e) => {
			touchStartY = e.changedTouches[0].screenY;
		};
		const animateModal = (show) => {
			const duration = show ? 0.645 : 0.625;
			if (show) {
				modal.classList.add('active');
				gsap.fromTo(modal,
					{ display: "none" },
					{ display: "flex" }
				);
				gsap.fromTo(modalContents,
					{ y: '100%' },
					{ y: 0, duration, ease: "power4.out" }
				);
			} else {
				modal.classList.remove('active');
				gsap.fromTo(modalContents,
					{ y: 0 },
					{ y: '100%', duration, ease: "power4.out" }
				);
				gsap.fromTo(modal,
					{ display: "flex" },
					{ display: "none" }
				);
			}
		};
		const handleTouchEnd = (e) => {
			const touchEndY = e.changedTouches[0].screenY;
			if (modal.classList.contains('active') && touchEndY > touchStartY + 1) {
				bodyWrap.classList.remove('modal-open');
				animateModal(false);
			}
		};
		const handleCloseClick = () => {
			if (modal.classList.contains('active')) {
				bodyWrap.classList.remove('modal-open');
				animateModal(false);
			}
		};
		const openModalButtons = document.querySelectorAll(`button[data-modal-name="${modalName}"]`);
		openModalButtons.forEach(button => {
			button.addEventListener('click', (event) => {
				bodyWrap.classList.add('modal-open');
				animateModal(true);
				if (modalName === 'filter') {
					const filterText = event.currentTarget.querySelector('span').textContent;
					const modalTitle = modal.querySelector('.modal-header .title');
					modalTitle.textContent = filterText;
				}
			});
		});
		const closeModalButtons = document.querySelectorAll('.btn-modal-mo-close');
		closeModalButtons.forEach(button => {
			button.addEventListener('touchstart', handleTouchStart);
			button.addEventListener('touchend', handleTouchEnd);
		});
		const allCloseButtons = document.querySelectorAll('.btn-modal-mo-close, .btn-modal-close');
		allCloseButtons.forEach(button => {
			button.addEventListener('click', handleCloseClick);
		});
	};

	// * 좌석 클래스 안내
	const toggleSeatClass = () => {
		const seatClassButtons = document.querySelectorAll('.seat-class-default');
		const handleClick = (event) => {
			seatClassButtons.forEach(button => {
				button.setAttribute('aria-expanded', 'false');
			});
			event.currentTarget.setAttribute('aria-expanded', 'true');
		};
		const handleBodyInteraction = () => {
			seatClassButtons.forEach(button => {
				button.setAttribute('aria-expanded', 'false');
			});
		};
		seatClassButtons.forEach(button => {
			button.addEventListener('click', handleClick);
		});
		document.body.addEventListener('touchstart', handleBodyInteraction);
		document.body.addEventListener('', handleBodyInteraction);
	};
	// * 여정 안내
	const toggleFlightScheduleDetail = () => {
		const scheduleDetailButtons = document.querySelectorAll('.btn-schedule-detail');
		const scheduleDetailCloseButtons = document.querySelectorAll('.btn-schedule-detail-close');
		const handleClick = (event) => {
			scheduleDetailButtons.forEach(button => {
				button.setAttribute('aria-expanded', 'false');
			});
			event.currentTarget.setAttribute('aria-expanded', 'true');
		};
		const handleClose = () => {
			scheduleDetailButtons.forEach(button => {
				button.setAttribute('aria-expanded', 'false');
			});
		};
		scheduleDetailButtons.forEach(button => {
			button.addEventListener('click', handleClick);
		});
		scheduleDetailCloseButtons.forEach(button => {
			button.addEventListener('click', handleClose);
		});
	};
	// * 선택한 필터 삭제
	const handleFilterDelete = () => {
		document.querySelectorAll('.btn-infilter-delete').forEach(button => {
			button.addEventListener('click', () => {
				const parent = button.closest('.selected-filter');
				if (parent) {
					parent.remove();
					const list = document.querySelector('.list-selected-filter');
					if (list && list.querySelectorAll('.selected-filter').length === 0) {
						list.style.display = 'none';
						document.querySelectorAll('.list-inline-filter-wrap .btn-inline-filter').forEach(filterButton => {
							filterButton.setAttribute('aria-checked', 'false');
						});
					}
				}
			});
		});
	};
	// * 필터 업데이트
	const updateSelectedFilterDisplay = () => {
		const listSelectedFilter = document.querySelector('.list-selected-filter');
		const selectedFilters = document.querySelectorAll('.selected-filter');
		if (listSelectedFilter) {
			listSelectedFilter.style.display = selectedFilters.length > 0 ? 'block' : 'none';
		}
	};
	const updateFilterCounts = () => {
		const selectedFilters = document.querySelectorAll('.selected-filter');
		const filterCounts = {};

		selectedFilters.forEach(filter => {
			const filterType = filter.getAttribute('data-filter-child');
			if (filterCounts[filterType]) {
				filterCounts[filterType]++;
			} else {
				filterCounts[filterType] = 1;
			}
		});
		document.querySelectorAll('.btn-inline-filter').forEach(button => {
			const filterType = button.getAttribute('data-filter-parent');
			const count = filterCounts[filterType] || 0;
			let countElement = button.querySelector('strong');
			if (count > 0) {
				if (!countElement) {
					countElement = document.createElement('strong');
					button.appendChild(countElement);
				}
				countElement.textContent = count;
				button.setAttribute('aria-checked', 'true');
			} else {
				if (countElement) {
					countElement.remove();
				}
				button.setAttribute('aria-checked', 'false');
			}
		});
	};
	const handleFilterDeleteCounts = () => {
		document.querySelectorAll('.btn-infilter-delete').forEach(button => {
			button.addEventListener('click', () => {
				const parent = button.closest('.selected-filter');
				if (parent) {
					parent.remove();
					updateSelectedFilterDisplay();
					updateFilterCounts();
				}
			});
		});
	};
	// * 필터 초기화
	const handleFilterReset = () => {
		const btnInlineReset = document.querySelector('.btn-inline-reset');
		if (btnInlineReset) {
			btnInlineReset.addEventListener('click', () => {
				document.querySelectorAll('.selected-filter').forEach(filter => {
					filter.remove();
				});
				updateSelectedFilterDisplay();
				updateFilterCounts();
			});
		}
	};
	// * 모바일 확인 
	const handleDeviceCheck = () => {
		const btnModalMobileCloses = document.querySelectorAll('.btn-modal-mo-close');
		const btnModalCloses = document.querySelectorAll('.btn-modal-close');
		const isMobile = /Mobi|Android/i.test(navigator.userAgent);
		btnModalCloses.forEach(btnModalClose => {
			btnModalClose.style.display = isMobile ? 'none' : 'inline-flex';
		});
		btnModalMobileCloses.forEach(btnModalMobileClose => {
			btnModalMobileClose.style.display = isMobile ? 'block' : 'none';
		});
		if (isMobile) {
			toggleSeatClass();
		}
	};

	updateSelectedFilterDisplay();
	updateFilterCounts();
	handleFilterDeleteCounts();
	handleFilterReset();
	const observer = new MutationObserver(() => {
		updateSelectedFilterDisplay();
		updateFilterCounts();
	});
	observer.observe(document.querySelector('.list-selected-filter'), { childList: true });
	handleDeviceCheck();
	handleFilterDelete();
	toggleFlightScheduleDetail();
	handleModal('align');
	handleModal('filter');
});
