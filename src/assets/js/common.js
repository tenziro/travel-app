
document.addEventListener('DOMContentLoaded', () => {
	const handleAlignModal = () => {
		let touchStartY = 0;
		let touchEndY = 0;
		const bodyWrap = document.querySelector('body');
		const btnFilter = document.querySelector('.btn-list-filter');
		const alignModal = document.querySelector('.modal[data-type="bottom"]');

		const handleTouchStart = (e) => {
			touchStartY = e.changedTouches[0].screenY;
		};

		const handleTouchEnd = (e) => {
			touchEndY = e.changedTouches[0].screenY;
			bodyWrap.classList.remove('modal-open');
			if (touchEndY > touchStartY + 1) {
				alignModal.classList.remove('active');
			}
		};

		const handleCloseClick = () => {
			bodyWrap.classList.remove('modal-open');
			alignModal.classList.remove('active');
		};

		btnFilter.addEventListener('click', () => {
			bodyWrap.classList.add('modal-open');
			alignModal.classList.add('active');
		});

		document.querySelectorAll('.btn-modal-mo-close').forEach(button => {
			button.addEventListener('touchstart', handleTouchStart);
			button.addEventListener('touchend', handleTouchEnd);
		});

		document.querySelectorAll('.btn-modal-mo-close, .btn-modal-close').forEach(button => {
			button.addEventListener('click', handleCloseClick);
		});

	}
	// 클릭한 대상의 aria-checked 속성을 토글
	const toggleAriaChecked = () => {
		document.querySelectorAll('.btn-inline-filter').forEach(button => {
			button.addEventListener('click', () => {
				const isChecked = button.getAttribute('aria-checked') === 'true';
				button.setAttribute('aria-checked', !isChecked);
				const listSelectedFilter = document.querySelector('.list-selected-filter');
				const hasCheckedFilter = Array.from(document.querySelectorAll('.btn-inline-filter')).some(filterButton => filterButton.getAttribute('aria-checked') === 'true');
				if (listSelectedFilter) {
					listSelectedFilter.style.display = hasCheckedFilter ? 'block' : 'none';
				}
			});
		});
	};
	// 선택한 필터 삭제
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
	handleAlignModal();
	toggleAriaChecked();
	handleFilterDelete();
});
