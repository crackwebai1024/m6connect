const icons = [
  'access-point-check',
  'access-point-minus',
  'access-point-off',
  'access-point-plus',
  'access-point-remove',
  'account-reactivate',
  'account-reactivate-outline',
  'account-supervisor-circle-outline',
  'air-humidifier-off',
  'alert-minus',
  'alert-minus-outline',
  'alert-plus',
  'alert-plus-outline',
  'alert-remove',
  'alert-remove-outline',
  'archive-alert',
  'archive-alert-outline',
  'axis-arrow-info',
  'baby-buggy',
  'basket-minus',
  'basket-minus-outline',
  'basket-off',
  'basket-off-outline',
  'basket-plus',
  'basket-plus-outline',
  'basket-remove',
  'basket-remove-outline',
  'beehive-off-outline',
  'beekeeper',
  'bell-cancel',
  'bell-cancel-outline',
  'bell-minus',
  'bell-minus-outline',
  'bell-remove',
  'bell-remove-outline',
  'book-account',
  'book-account-outline',
  'book-check',
  'book-check-outline',
  'book-open-variant',
  'briefcase-variant',
  'briefcase-variant-outline',
  'bucket',
  'bucket-outline',
  'cable-data',
  'car-arrow-left',
  'car-arrow-right',
  'car-cog',
  'car-lifted-pickup',
  'car-outline',
  'car-settings',
  'carabiner',
  'cash-check',
  'cash-lock',
  'cash-lock-open',
  'cellphone-charging',
  'chart-box',
  'chart-box-outline',
  'chart-box-plus-outline',
  'chat-minus',
  'chat-minus-outline',
  'chat-plus',
  'chat-plus-outline',
  'chat-remove',
  'chat-remove-outline',
  'cheese-off',
  'chili-off',
  'cigar-off',
  'circle-half',
  'circle-half-full',
  'clipboard-edit',
  'clipboard-edit-outline',
  'clock-time-eight',
  'clock-time-eight-outline',
  'clock-time-eleven',
  'clock-time-eleven-outline',
  'clock-time-five',
  'clock-time-five-outline',
  'clock-time-four',
  'clock-time-four-outline',
  'clock-time-nine',
  'clock-time-nine-outline',
  'clock-time-one',
  'clock-time-one-outline',
  'clock-time-seven',
  'clock-time-seven-outline',
  'clock-time-six',
  'clock-time-six-outline',
  'clock-time-ten',
  'clock-time-ten-outline',
  'clock-time-three',
  'clock-time-three-outline',
  'clock-time-twelve',
  'clock-time-twelve-outline',
  'clock-time-two',
  'clock-time-two-outline',
  'close-thick',
  'cog-off',
  'cog-off-outline',
  'cog-refresh',
  'cog-refresh-outline',
  'cog-sync',
  'cog-sync-outline',
  'compare-horizontal',
  'compare-vertical',
  'content-save-cog',
  'content-save-cog-outline',
  'corn-off',
  'cosine-wave',
  'credit-card-check',
  'credit-card-check-outline',
  'cube-off',
  'cube-off-outline',
  'currency-mnt',
  'current-ac',
  'data-matrix',
  'data-matrix-edit',
  'data-matrix-minus',
  'data-matrix-plus',
  'data-matrix-remove',
  'data-matrix-scan',
  'dock-top',
  'dome-light',
  'download-box',
  'download-box-outline',
  'download-circle',
  'download-circle-outline',
  'earth-box-minus',
  'earth-box-plus',
  'earth-box-remove',
  'earth-minus',
  'earth-plus',
  'earth-remove',
  'egg-off',
  'egg-off-outline',
  'egg-outline',
  'email-off',
  'email-off-outline',
  'escalator-box',
  'ev-plug-ccs1',
  'ev-plug-ccs2',
  'ev-plug-chademo',
  'ev-plug-tesla',
  'ev-plug-type1',
  'ev-plug-type2',
  'eyedropper-minus',
  'eyedropper-off',
  'eyedropper-plus',
  'eyedropper-remove',
  'fan-alert',
  'fan-chevron-down',
  'fan-chevron-up',
  'fan-minus',
  'fan-plus',
  'fan-remove',
  'fan-speed-1',
  'fan-speed-2',
  'fan-speed-3',
  'fencing',
  'file-document-multiple',
  'file-document-multiple-outline',
  'file-tree-outline',
  'filter-off',
  'filter-off-outline',
  'fish-off',
  'flask-empty-off',
  'flask-empty-off-outline',
  'flask-off',
  'flask-off-outline',
  'folder-multiple-plus',
  'folder-multiple-plus-outline',
  'folder-star-multiple',
  'folder-star-multiple-outline',
  'food-drumstick',
  'food-drumstick-off',
  'food-drumstick-off-outline',
  'food-drumstick-outline',
  'food-steak',
  'food-steak-off',
  'food-variant-off',
  'form-dropdown',
  'form-select',
  'format-text-variant-outline',
  'fruit-cherries-off',
  'fruit-citrus-off',
  'fuse-alert',
  'fuse-off',
  'gas-station-off',
  'gas-station-off-outline',
  'grass',
  'hand-water',
  'heart-minus',
  'heart-minus-outline',
  'heart-off-outline',
  'heart-plus',
  'heart-plus-outline',
  'heart-remove',
  'heart-remove-outline',
  'home-minus-outline',
  'home-plus-outline',
  'home-remove-outline',
  'home-search',
  'home-search-outline',
  'hours-24',
  'human-baby-changing-table',
  'human-edit',
  'human-male-child',
  'human-wheelchair',
  'image-minus',
  'image-remove',
  'incognito-circle',
  'incognito-circle-off',
  'laser-pointer',
  'lightning-bolt',
  'lightning-bolt-outline',
  'lingerie',
  'lipstick',
  'lock-check',
  'lock-open-alert',
  'lock-open-check',
  'microsoft-access',
  'microsoft-excel',
  'microsoft-powerpoint',
  'microsoft-sharepoint',
  'microsoft-word',
  'microwave-off',
  'minus-circle-off',
  'minus-circle-off-outline',
  'monitor-eye',
  'monitor-share',
  'motion-sensor-off',
  'mushroom-off',
  'mushroom-off-outline',
  'nintendo-game-boy',
  'notebook-check',
  'notebook-check-outline',
  'notebook-edit',
  'notebook-edit-outline',
  'office-building-marker',
  'office-building-marker-outline',
  'office-building-outline',
  'order-bool-descending',
  'pail',
  'pail-minus',
  'pail-minus-outline',
  'pail-off',
  'pail-off-outline',
  'pail-outline',
  'pail-plus',
  'pail-plus-outline',
  'pail-remove',
  'pail-remove-outline',
  'phone-remove',
  'phone-remove-outline',
  'pine-tree-fire',
  'play-box-multiple-outline',
  'plus-minus-variant',
  'polo',
  'power-plug-off-outline',
  'power-plug-outline',
  'power-socket-it',
  'printer-eye',
  'printer-search',
  'progress-question',
  'pump',
  'puzzle-check',
  'puzzle-check-outline',
  'puzzle-edit',
  'puzzle-edit-outline',
  'puzzle-heart',
  'puzzle-heart-outline',
  'puzzle-minus',
  'puzzle-minus-outline',
  'puzzle-plus',
  'puzzle-plus-outline',
  'puzzle-remove',
  'puzzle-remove-outline',
  'puzzle-star',
  'puzzle-star-outline',
  'radiology-box',
  'radiology-box-outline',
  'rake',
  'recycle-variant',
  'relation-many-to-many',
  'relation-many-to-one',
  'relation-many-to-one-or-many',
  'relation-many-to-only-one',
  'relation-many-to-zero-or-many',
  'relation-many-to-zero-or-one',
  'relation-one-or-many-to-many',
  'relation-one-or-many-to-one',
  'relation-one-or-many-to-one-or-many',
  'relation-one-or-many-to-only-one',
  'relation-one-or-many-to-zero-or-many',
  'relation-one-or-many-to-zero-or-one',
  'relation-one-to-many',
  'relation-one-to-one',
  'relation-one-to-one-or-many',
  'relation-one-to-only-one',
  'relation-one-to-zero-or-many',
  'relation-one-to-zero-or-one',
  'relation-only-one-to-many',
  'relation-only-one-to-one',
  'relation-only-one-to-one-or-many',
  'relation-only-one-to-only-one',
  'relation-only-one-to-zero-or-many',
  'relation-only-one-to-zero-or-one',
  'relation-zero-or-many-to-many',
  'relation-zero-or-many-to-one',
  'relation-zero-or-many-to-one-or-many',
  'relation-zero-or-many-to-only-one',
  'relation-zero-or-many-to-zero-or-many',
  'relation-zero-or-many-to-zero-or-one',
  'relation-zero-or-one-to-many',
  'relation-zero-or-one-to-one',
  'relation-zero-or-one-to-one-or-many',
  'relation-zero-or-one-to-only-one',
  'relation-zero-or-one-to-zero-or-many',
  'relation-zero-or-one-to-zero-or-one',
  'rhombus-medium-outline',
  'rhombus-split-outline',
  'rocket-launch',
  'rocket-launch-outline',
  'rocket-outline',
  'rug',
  'sawtooth-wave',
  'scan-helper',
  'seed-off',
  'seed-off-outline',
  'set-merge',
  'set-split',
  'set-square',
  'shape-square-rounded-plus',
  'share-variant-outline',
  'shield-bug',
  'shield-bug-outline',
  'shore',
  'sign-pole',
  'size-l',
  'size-m',
  'size-s',
  'size-xl',
  'size-xs',
  'size-xxl',
  'size-xxs',
  'size-xxxl',
  'skateboard',
  'skull-scan',
  'skull-scan-outline',
  'smoking-pipe',
  'smoking-pipe-off',
  'snake',
  'snowflake-off',
  'sort-bool-ascending',
  'sort-bool-ascending-variant',
  'sort-bool-descending',
  'sort-bool-descending-variant',
  'sort-calendar-ascending',
  'sort-calendar-descending',
  'sort-clock-ascending',
  'sort-clock-ascending-outline',
  'sort-clock-descending',
  'sort-clock-descending-outline',
  'sort-numeric-ascending',
  'sort-numeric-descending',
  'source-branch-check',
  'source-branch-minus',
  'source-branch-plus',
  'source-branch-refresh',
  'source-branch-remove',
  'source-branch-sync',
  'soy-sauce-off',
  'sparkles',
  'spirit-level',
  'spoon-sugar',
  'square-circle',
  'square-rounded',
  'square-rounded-outline',
  'square-wave',
  'stairs-box',
  'symbol',
  'table-account',
  'table-alert',
  'table-arrow-down',
  'table-arrow-left',
  'table-arrow-right',
  'table-arrow-up',
  'table-cancel',
  'table-check',
  'table-clock',
  'table-cog',
  'table-eye-off',
  'table-heart',
  'table-key',
  'table-lock',
  'table-minus',
  'table-multiple',
  'table-network',
  'table-off',
  'table-refresh',
  'table-split-cell',
  'table-star',
  'table-sync',
  'tailwind',
  'text-search',
  'thermometer-off',
  'ticket-confirmation-outline',
  'ticket-percent-outline',
  'timeline-check',
  'timeline-check-outline',
  'timeline-minus',
  'timeline-minus-outline',
  'timeline-remove',
  'timeline-remove-outline',
  'timer',
  'timer-off',
  'tractor-variant',
  'transit-connection-horizontal',
  'transit-skip',
  'triangle-wave',
  'tune-variant',
  'tune-vertical-variant',
  'umbrella-closed-outline',
  'umbrella-closed-variant',
  'video-3d-off',
  'video-high-definition',
  'view-array-outline',
  'view-carousel-outline',
  'view-column-outline',
  'view-comfy-outline',
  'view-dashboard-variant-outline',
  'view-day-outline',
  'view-list-outline',
  'view-module-outline',
  'view-parallel-outline',
  'view-quilt-outline',
  'view-sequential-outline',
  'view-stream-outline',
  'view-week-outline',
  'virus',
  'virus-outline',
  'water-alert',
  'water-alert-outline',
  'water-check',
  'water-check-outline',
  'water-minus',
  'water-minus-outline',
  'water-off-outline',
  'water-percent-alert',
  'water-plus',
  'water-plus-outline',
  'water-remove',
  'water-remove-outline',
  'watering-can',
  'watering-can-outline',
  'waveform',
  'weather-sunny-off',
  'wheel-barrow',
  'wizard-hat',
  'yurt'
]

export default icons
