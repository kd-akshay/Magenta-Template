import { useState, useEffect, useMemo } from 'react'
import { 
  Button, Input, Card, Badge, Loader, Modal, Tooltip, PopupMenu, useToast,
  AnimatedButton, AnimatedCard, AnimatedBadge, AnimatedProgress, AnimatedSkeleton, AnimatedCounter,
  Accordion, Tabs, Checkbox, CheckboxCard, Radio, Switch, Alert, Avatar, Divider, Breadcrumbs, Textarea, Select, Pagination,
  Table, TableHeader, TableBody, TableRow, TableCell, SortableTableHeader, type SortDirection,
  TableWithPagination, type TableColumn,
  Stepper, Slider, Rating, EmptyState,
  Listbox, Combobox, Popover, RadioGroup,
  Chip, Dropdown, Drawer, DatePicker, CommandPalette
} from '@/components/ui'
import { EllipsisVerticalIcon, CheckCircleIcon, XCircleIcon, UserIcon, ShoppingBagIcon, CreditCardIcon, TruckIcon, InformationCircleIcon, HeartIcon, StarIcon, PlusIcon, TrashIcon, PencilIcon, ShareIcon, BellIcon, MagnifyingGlassIcon, CommandLineIcon, HomeIcon, DocumentIcon, Cog6ToothIcon } from '@heroicons/react/24/outline'

const Components = () => {
  const { showToast } = useToast()
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [progress, setProgress] = useState(0)
  const [counter, setCounter] = useState(0)
  const [sortKey, setSortKey] = useState<string>('')
  const [sortDirection, setSortDirection] = useState<SortDirection>(null)
  const [selectedRow, setSelectedRow] = useState<number | null>(null)
  const [horizontalStep, setHorizontalStep] = useState(0)
  const [verticalStep, setVerticalStep] = useState(0)
  const [sliderValue, setSliderValue] = useState(50)
  const [ratingValue, setRatingValue] = useState(0)
  const [listboxValue, setListboxValue] = useState<string | number>('')
  const [comboboxValue, setComboboxValue] = useState<string | number>('')
  const [radioGroupValue, setRadioGroupValue] = useState<string | number>('option1')
  
  // CheckboxCard states
  const [basicPlanChecked, setBasicPlanChecked] = useState(false)
  const [proPlanChecked, setProPlanChecked] = useState(true)
  const [feature1Checked, setFeature1Checked] = useState(false)
  const [feature2Checked, setFeature2Checked] = useState(true)
  const [premiumSupportChecked, setPremiumSupportChecked] = useState(false)
  const [apiAccessChecked, setApiAccessChecked] = useState(false)
  
  // New component states
  const [isDrawerOpen, setIsDrawerOpen] = useState(false)
  const [drawerPosition, setDrawerPosition] = useState<'left' | 'right' | 'top' | 'bottom'>('right')
  const [isCommandPaletteOpen, setIsCommandPaletteOpen] = useState(false)
  const [selectedChips, setSelectedChips] = useState<string[]>(['React', 'TypeScript'])
  const [dropdownValue, setDropdownValue] = useState<string | number>('')
  const [dateValue, setDateValue] = useState('')
  
  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((prev) => (prev >= 100 ? 0 : prev + 10))
    }, 500)
    return () => clearInterval(interval)
  }, [])

  // Keyboard shortcut for Command Palette (Ctrl+K / Cmd+K)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
        e.preventDefault()
        setIsCommandPaletteOpen((prev) => !prev)
      }
      if (e.key === 'Escape' && isCommandPaletteOpen) {
        setIsCommandPaletteOpen(false)
      }
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [isCommandPaletteOpen])
  
  useEffect(() => {
    const interval = setInterval(() => {
      setCounter((prev) => (prev >= 1000 ? 0 : prev + 50))
    }, 100)
    return () => clearInterval(interval)
  }, [])

  const handleSort = (key: string) => {
    if (sortKey === key) {
      if (sortDirection === 'asc') {
        setSortDirection('desc')
      } else if (sortDirection === 'desc') {
        setSortDirection(null)
        setSortKey('')
      } else {
        setSortDirection('asc')
      }
    } else {
      setSortKey(key)
      setSortDirection('asc')
    }
  }

  const tableData = [
    { id: 1, name: 'John Doe', email: 'john@example.com', role: 'Admin', status: 'Active' },
    { id: 2, name: 'Jane Smith', email: 'jane@example.com', role: 'User', status: 'Active' },
    { id: 3, name: 'Bob Johnson', email: 'bob@example.com', role: 'User', status: 'Inactive' },
    { id: 4, name: 'Alice Brown', email: 'alice@example.com', role: 'Moderator', status: 'Active' },
    { id: 5, name: 'Charlie Wilson', email: 'charlie@example.com', role: 'User', status: 'Active' },
  ]

  // Extended table data for pagination example
  const paginatedTableData = [
    { id: 1, name: 'John Doe', email: 'john@example.com', role: 'Admin', status: 'Active', joinDate: '2023-01-15' },
    { id: 2, name: 'Jane Smith', email: 'jane@example.com', role: 'User', status: 'Active', joinDate: '2023-02-20' },
    { id: 3, name: 'Bob Johnson', email: 'bob@example.com', role: 'User', status: 'Inactive', joinDate: '2023-03-10' },
    { id: 4, name: 'Alice Brown', email: 'alice@example.com', role: 'Moderator', status: 'Active', joinDate: '2023-04-05' },
    { id: 5, name: 'Charlie Wilson', email: 'charlie@example.com', role: 'User', status: 'Active', joinDate: '2023-05-12' },
    { id: 6, name: 'David Lee', email: 'david@example.com', role: 'User', status: 'Active', joinDate: '2023-06-18' },
    { id: 7, name: 'Emma Davis', email: 'emma@example.com', role: 'Moderator', status: 'Active', joinDate: '2023-07-22' },
    { id: 8, name: 'Frank Miller', email: 'frank@example.com', role: 'Admin', status: 'Active', joinDate: '2023-08-30' },
    { id: 9, name: 'Grace Taylor', email: 'grace@example.com', role: 'User', status: 'Inactive', joinDate: '2023-09-14' },
    { id: 10, name: 'Henry White', email: 'henry@example.com', role: 'User', status: 'Active', joinDate: '2023-10-08' },
    { id: 11, name: 'Ivy Martinez', email: 'ivy@example.com', role: 'User', status: 'Active', joinDate: '2023-11-19' },
    { id: 12, name: 'Jack Anderson', email: 'jack@example.com', role: 'Moderator', status: 'Active', joinDate: '2023-12-03' },
    { id: 13, name: 'Kate Thompson', email: 'kate@example.com', role: 'User', status: 'Active', joinDate: '2024-01-11' },
    { id: 14, name: 'Liam Garcia', email: 'liam@example.com', role: 'User', status: 'Inactive', joinDate: '2024-02-25' },
    { id: 15, name: 'Mia Rodriguez', email: 'mia@example.com', role: 'Admin', status: 'Active', joinDate: '2024-03-09' },
    { id: 16, name: 'Noah Martinez', email: 'noah@example.com', role: 'User', status: 'Active', joinDate: '2024-04-17' },
    { id: 17, name: 'Olivia Lopez', email: 'olivia@example.com', role: 'User', status: 'Active', joinDate: '2024-05-23' },
    { id: 18, name: 'Paul Harris', email: 'paul@example.com', role: 'Moderator', status: 'Active', joinDate: '2024-06-30' },
    { id: 19, name: 'Quinn Clark', email: 'quinn@example.com', role: 'User', status: 'Inactive', joinDate: '2024-07-14' },
    { id: 20, name: 'Rachel Lewis', email: 'rachel@example.com', role: 'User', status: 'Active', joinDate: '2024-08-21' },
  ]

  // Define columns for paginated table
  const paginatedTableColumns: TableColumn<typeof paginatedTableData[0]>[] = [
    { key: 'id', header: 'ID', align: 'left' },
    { key: 'name', header: 'Name', align: 'left' },
    { key: 'email', header: 'Email', align: 'left' },
    { key: 'role', header: 'Role', align: 'left' },
    {
      key: 'status',
      header: 'Status',
      align: 'center',
      render: (value) => (
        <Badge variant={value === 'Active' ? 'success' : 'secondary'}>
          {value}
        </Badge>
      ),
    },
    { key: 'joinDate', header: 'Join Date', align: 'left' },
  ]

  const sortedTableData = useMemo(() => {
    if (!sortKey || !sortDirection) {
      return tableData
    }

    return [...tableData].sort((a, b) => {
      const aValue = a[sortKey as keyof typeof a]
      const bValue = b[sortKey as keyof typeof b]

      if (aValue < bValue) {
        return sortDirection === 'asc' ? -1 : 1
      }
      if (aValue > bValue) {
        return sortDirection === 'asc' ? 1 : -1
      }
      return 0
    })
  }, [sortKey, sortDirection])
  
  return (
    <div className="space-y-12 py-8">
      <div className="text-center">
        <h1 className="text-4xl font-bold text-gray-900 dark:text-gray-100 mb-4">
          Component Showcase
        </h1>
        <p className="text-lg text-gray-600 dark:text-gray-400">
          Explore all available UI components
        </p>
      </div>
      
      {/* Buttons */}
      <Card header={<h2 className="text-xl font-semibold">Buttons</h2>}>
        <div className="space-y-6">
          <div>
            <h3 className="text-lg font-medium mb-3">Standard Buttons</h3>
            <div className="flex flex-wrap gap-4">
              <Button variant="primary">Primary</Button>
              <Button variant="secondary">Secondary</Button>
              <Button variant="outline">Outline</Button>
              <Button variant="ghost">Ghost</Button>
              <Button variant="danger">Danger</Button>
              <Button size="sm">Small</Button>
              <Button size="md">Medium</Button>
              <Button size="lg">Large</Button>
              <Button isLoading>Loading</Button>
            </div>
          </div>
          <div>
            <h3 className="text-lg font-medium mb-3">Pill Buttons</h3>
            <div className="flex flex-wrap gap-4">
              <Button variant="primary" pill>Primary Pill</Button>
              <Button variant="secondary" pill>Secondary Pill</Button>
              <Button variant="outline" pill>Outline Pill</Button>
              <Button variant="ghost" pill>Ghost Pill</Button>
              <Button variant="danger" pill>Danger Pill</Button>
              <Button size="sm" pill>Small Pill</Button>
              <Button size="md" pill>Medium Pill</Button>
              <Button size="lg" pill>Large Pill</Button>
              <Button isLoading pill>Loading Pill</Button>
            </div>
          </div>
        </div>
      </Card>
      
      {/* Inputs */}
      <Card header={<h2 className="text-xl font-semibold">Inputs</h2>}>
        <div className="space-y-4 max-w-md">
          <Input label="Default Input" placeholder="Enter text..." />
          <Input label="Email Input" type="email" placeholder="email@example.com" />
          <Input label="Input with Error" error="This field is required" />
        </div>
      </Card>
      
      {/* Badges */}
      <Card header={<h2 className="text-xl font-semibold">Badges</h2>}>
        <div className="flex flex-wrap gap-4">
          <Badge variant="primary">Primary</Badge>
          <Badge variant="secondary">Secondary</Badge>
          <Badge variant="success">Success</Badge>
          <Badge variant="warning">Warning</Badge>
          <Badge variant="danger">Danger</Badge>
          <Badge variant="info">Info</Badge>
          <Badge size="sm">Small</Badge>
          <Badge size="md">Medium</Badge>
          <Badge size="lg">Large</Badge>
        </div>
      </Card>
      
      {/* Loader */}
      <Card header={<h2 className="text-xl font-semibold">Loaders</h2>}>
        <div className="flex items-center gap-8">
          <div className="flex flex-col items-center gap-2">
            <Loader size="sm" />
            <span className="text-sm text-gray-600 dark:text-gray-400">Small</span>
          </div>
          <div className="flex flex-col items-center gap-2">
            <Loader size="md" />
            <span className="text-sm text-gray-600 dark:text-gray-400">Medium</span>
          </div>
          <div className="flex flex-col items-center gap-2">
            <Loader size="lg" />
            <span className="text-sm text-gray-600 dark:text-gray-400">Large</span>
          </div>
        </div>
      </Card>
      
      {/* Modal */}
      <Card header={<h2 className="text-xl font-semibold">Modal</h2>}>
        <Button onClick={() => setIsModalOpen(true)}>Open Modal</Button>
        <Modal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          title="Example Modal"
        >
          <p className="mb-4">This is a modal dialog example.</p>
          <Button onClick={() => setIsModalOpen(false)}>Close</Button>
        </Modal>
      </Card>
      
      {/* Tooltip */}
      <Card header={<h2 className="text-xl font-semibold">Tooltip</h2>}>
        <div className="flex gap-4">
          <Tooltip content="This is a tooltip">
            <Button>Hover me</Button>
          </Tooltip>
          <Tooltip content="Tooltip on top" position="top">
            <Button variant="secondary">Top</Button>
          </Tooltip>
          <Tooltip content="Tooltip on bottom" position="bottom">
            <Button variant="outline">Bottom</Button>
          </Tooltip>
        </div>
      </Card>
      
      {/* Popup Menu */}
      <Card header={<h2 className="text-xl font-semibold">Popup Menu</h2>}>
        <div className="flex flex-wrap gap-3 items-start">
          <div className="flex-shrink-0">
            <h3 className="text-sm font-semibold text-gray-900 dark:text-gray-100 mb-4">Default (Bottom Direction)</h3>
            <div className="p-6 bg-gray-50 dark:bg-gray-900/50 rounded-lg border border-gray-200 dark:border-gray-700 inline-block">
              <PopupMenu
                trigger={
                  <Button variant="ghost">
                    <EllipsisVerticalIcon className="h-5 w-5" />
                    Open Menu
                  </Button>
                }
                items={[
                  { label: 'Edit', onClick: () => showToast('Edit clicked', 'info') },
                  { label: 'Duplicate', onClick: () => showToast('Duplicate clicked', 'info') },
                  { label: 'Delete', onClick: () => showToast('Delete clicked', 'error'), danger: true },
                ]}
              />
            </div>
          </div>

          <div className="flex-shrink-0">
            <h3 className="text-sm font-semibold text-gray-900 dark:text-gray-100 mb-4">Top Direction</h3>
            <div className="p-6 bg-gray-50 dark:bg-gray-900/50 rounded-lg border border-gray-200 dark:border-gray-700 flex justify-center items-center">
              <PopupMenu
                direction="top"
                trigger={
                  <Button variant="ghost">
                    <EllipsisVerticalIcon className="h-5 w-5" />
                    Open Menu (Top)
                  </Button>
                }
                items={[
                  { label: 'Edit', onClick: () => showToast('Edit clicked', 'info') },
                  { label: 'Duplicate', onClick: () => showToast('Duplicate clicked', 'info') },
                  { label: 'Delete', onClick: () => showToast('Delete clicked', 'error'), danger: true },
                ]}
              />
            </div>
          </div>

          <div className="flex-shrink-0">
            <h3 className="text-sm font-semibold text-gray-900 dark:text-gray-100 mb-4">Left Direction</h3>
            <div className="p-6 bg-gray-50 dark:bg-gray-900/50 rounded-lg border border-gray-200 dark:border-gray-700 flex justify-end items-center ">
              <PopupMenu
                direction="left"
                trigger={
                  <Button variant="ghost">
                    <EllipsisVerticalIcon className="h-5 w-5" />
                    Open Menu (Left)
                  </Button>
                }
                items={[
                  { label: 'Edit', onClick: () => showToast('Edit clicked', 'info') },
                  { label: 'Duplicate', onClick: () => showToast('Duplicate clicked', 'info') },
                  { label: 'Delete', onClick: () => showToast('Delete clicked', 'error'), danger: true },
                ]}
              />
            </div>
          </div>

          <div className="flex-shrink-0">
            <h3 className="text-sm font-semibold text-gray-900 dark:text-gray-100 mb-4">Right Direction</h3>
            <div className="p-6 bg-gray-50 dark:bg-gray-900/50 rounded-lg border border-gray-200 dark:border-gray-700 flex justify-start items-center ">
              <PopupMenu
                direction="right"
                trigger={
                  <Button variant="ghost">
                    <EllipsisVerticalIcon className="h-5 w-5" />
                    Open Menu (Right)
                  </Button>
                }
                items={[
                  { label: 'Edit', onClick: () => showToast('Edit clicked', 'info') },
                  { label: 'Duplicate', onClick: () => showToast('Duplicate clicked', 'info') },
                  { label: 'Delete', onClick: () => showToast('Delete clicked', 'error'), danger: true },
                ]}
              />
            </div>
          </div>
        </div>
      </Card>
      
      {/* Round Buttons with Icons */}
      <Card header={<h2 className="text-xl font-semibold">Round Buttons with Icons</h2>}>
        <div className="space-y-6">
          <div>
            <h3 className="text-sm font-semibold text-gray-900 dark:text-gray-100 mb-4">Sizes</h3>
            <div className="flex flex-wrap items-center gap-4">
              <Button round size="sm" variant="primary">
                <PlusIcon className="h-4 w-4" />
              </Button>
              <Button round size="md" variant="primary">
                <PlusIcon className="h-5 w-5" />
              </Button>
              <Button round size="lg" variant="primary">
                <PlusIcon className="h-6 w-6" />
              </Button>
            </div>
          </div>

          <div>
            <h3 className="text-sm font-semibold text-gray-900 dark:text-gray-100 mb-4">Variants</h3>
            <div className="flex flex-wrap items-center gap-4">
              <Button round variant="primary">
                <HeartIcon className="h-5 w-5" />
              </Button>
              <Button round variant="secondary">
                <StarIcon className="h-5 w-5" />
              </Button>
              <Button round variant="outline">
                <ShareIcon className="h-5 w-5" />
              </Button>
              <Button round variant="ghost">
                <BellIcon className="h-5 w-5" />
              </Button>
              <Button round variant="danger">
                <TrashIcon className="h-5 w-5" />
              </Button>
            </div>
          </div>

          <div>
            <h3 className="text-sm font-semibold text-gray-900 dark:text-gray-100 mb-4">With Tooltips</h3>
            <div className="flex flex-wrap items-center gap-4">
              <Tooltip content="Add to favorites">
                <Button round variant="primary">
                  <HeartIcon className="h-5 w-5" />
                </Button>
              </Tooltip>
              <Tooltip content="Edit item">
                <Button round variant="outline">
                  <PencilIcon className="h-5 w-5" />
                </Button>
              </Tooltip>
              <Tooltip content="Delete item">
                <Button round variant="danger">
                  <TrashIcon className="h-5 w-5" />
                </Button>
              </Tooltip>
              <Tooltip content="Share">
                <Button round variant="ghost">
                  <ShareIcon className="h-5 w-5" />
                </Button>
              </Tooltip>
            </div>
          </div>
        </div>
      </Card>
      
      {/* Toast Examples */}
      <Card header={<h2 className="text-xl font-semibold">Toast Notifications</h2>}>
        <div className="flex flex-wrap gap-4">
          <Button onClick={() => showToast('Success message!', 'success')}>
            Success Toast
          </Button>
          <Button onClick={() => showToast('Error message!', 'error')}>
            Error Toast
          </Button>
          <Button onClick={() => showToast('Warning message!', 'warning')}>
            Warning Toast
          </Button>
          <Button onClick={() => showToast('Info message!', 'info')}>
            Info Toast
          </Button>
        </div>
      </Card>
      
      {/* Animated Buttons */}
      <Card header={<h2 className="text-xl font-semibold">Animated Buttons</h2>}>
        <div className="space-y-4">
          <div>
            <h3 className="text-lg font-medium mb-3">Animation Types</h3>
            <div className="flex flex-wrap gap-4">
              <AnimatedButton variant="primary" animation="bounce">Bounce</AnimatedButton>
              <AnimatedButton variant="secondary" animation="pulse">Pulse</AnimatedButton>
              <AnimatedButton variant="outline" animation="shake">Shake</AnimatedButton>
              <AnimatedButton variant="ghost" animation="none">No Animation</AnimatedButton>
            </div>
          </div>
        </div>
      </Card>
      
      {/* Animated Cards */}
      <Card header={<h2 className="text-xl font-semibold">Animated Cards</h2>}>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <AnimatedCard animation="lift" header={<h4 className="font-semibold">Lift Effect</h4>}>
            <p className="text-sm text-gray-600 dark:text-gray-400">Hover to see lift animation</p>
          </AnimatedCard>
          <AnimatedCard animation="glow" header={<h4 className="font-semibold">Glow Effect</h4>}>
            <p className="text-sm text-gray-600 dark:text-gray-400">Hover to see glow animation</p>
          </AnimatedCard>
          <AnimatedCard animation="scale" header={<h4 className="font-semibold">Scale Effect</h4>}>
            <p className="text-sm text-gray-600 dark:text-gray-400">Hover to see scale animation</p>
          </AnimatedCard>
        </div>
      </Card>
      
      {/* Animated Badges */}
      <Card header={<h2 className="text-xl font-semibold">Animated Badges</h2>}>
        <div className="flex flex-wrap gap-4 items-center">
          <AnimatedBadge variant="primary" animation="pulse">Pulsing</AnimatedBadge>
          <AnimatedBadge variant="success" animation="bounce">Bouncing</AnimatedBadge>
          <AnimatedBadge variant="warning" animation="ping">Pinging</AnimatedBadge>
          <AnimatedBadge variant="danger" animation="none">Static</AnimatedBadge>
        </div>
      </Card>
      
      {/* Animated Progress */}
      <Card header={<h2 className="text-xl font-semibold">Animated Progress Bars</h2>}>
        <div className="space-y-6">
          <div>
            <AnimatedProgress value={progress} variant="primary" showLabel animated />
          </div>
          <div>
            <AnimatedProgress value={75} variant="success" size="md" showLabel />
          </div>
          <div>
            <AnimatedProgress value={50} variant="warning" size="lg" showLabel />
          </div>
          <div>
            <AnimatedProgress value={25} variant="danger" size="sm" showLabel />
          </div>
        </div>
      </Card>
      
      {/* Animated Skeleton */}
      <Card header={<h2 className="text-xl font-semibold">Animated Skeleton Loaders</h2>}>
        <div className="space-y-4">
          <div>
            <h3 className="text-sm font-medium mb-2">Text Skeleton</h3>
            <AnimatedSkeleton variant="text" lines={3} />
          </div>
          <div>
            <h3 className="text-sm font-medium mb-2">Circular Skeleton</h3>
            <AnimatedSkeleton variant="circular" width={60} height={60} />
          </div>
          <div>
            <h3 className="text-sm font-medium mb-2">Rectangular Skeleton</h3>
            <AnimatedSkeleton variant="rectangular" width="100%" height={120} />
          </div>
        </div>
      </Card>
      
      {/* Animated Counter */}
      <Card header={<h2 className="text-xl font-semibold">Animated Counter</h2>}>
        <div className="space-y-4">
          <div className="text-4xl font-bold text-primary">
            <AnimatedCounter value={counter} duration={1000} />
          </div>
          <div className="text-2xl font-semibold">
            $<AnimatedCounter value={counter} duration={1000} decimals={2} />
          </div>
          <div className="text-lg">
            <AnimatedCounter value={counter} duration={1000} prefix="Count: " suffix=" items" />
          </div>
        </div>
      </Card>
      
      {/* Accordion */}
      <Card header={<h2 className="text-xl font-semibold">Accordion</h2>}>
        <Accordion
          items={[
            {
              title: 'What is this template?',
              content: 'This is a production-ready React + TypeScript starter template with Vite, Tailwind CSS, Redux Toolkit, and more.',
              defaultOpen: true,
            },
            {
              title: 'How do I customize it?',
              content: 'You can customize colors, components, and layouts by modifying the Tailwind config and component files.',
            },
            {
              title: 'Is it mobile responsive?',
              content: 'Yes! All components are built with mobile-first responsive design principles.',
            },
          ]}
        />
      </Card>
      
      {/* Tabs */}
      <Card header={<h2 className="text-xl font-semibold">Tabs</h2>}>
        <Tabs
          items={[
            {
              label: 'Overview',
              content: <div className="p-4">This is the overview tab content.</div>,
            },
            {
              label: 'Details',
              content: <div className="p-4">This is the details tab content.</div>,
            },
            {
              label: 'Settings',
              content: <div className="p-4">This is the settings tab content.</div>,
            },
            {
              label: 'Disabled',
              content: <div className="p-4">This tab is disabled.</div>,
              disabled: true,
            },
          ]}
        />
      </Card>
      
      {/* Form Controls */}
      <Card header={<h2 className="text-xl font-semibold">Form Controls</h2>}>
        <div className="space-y-6">
          <div>
            <h3 className="text-lg font-medium mb-3">Checkboxes</h3>
            <div className="space-y-3">
              <Checkbox label="Accept terms and conditions" defaultChecked />
              <Checkbox label="Subscribe to newsletter" />
              <Checkbox label="Disabled checkbox" disabled />
              <Checkbox label="Checkbox with error" error="This field is required" />
            </div>
          </div>
          <Divider />
          <div>
            <h3 className="text-lg font-medium mb-3">Checkbox Cards</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              <CheckboxCard
                header={<h4 className="font-semibold text-lg">Basic Plan</h4>}
                checked={basicPlanChecked}
                onChange={(checked) => {
                  setBasicPlanChecked(checked)
                  showToast(`Basic Plan ${checked ? 'selected' : 'deselected'}`, 'info')
                }}
              >
                <div className="space-y-2">
                  <p className="text-2xl font-bold text-primary">$9<span className="text-sm font-normal text-gray-600 dark:text-gray-400">/month</span></p>
                  <ul className="text-sm text-gray-600 dark:text-gray-400 space-y-1">
                    <li>✓ 10 Projects</li>
                    <li>✓ 5GB Storage</li>
                    <li>✓ Basic Support</li>
                  </ul>
                </div>
              </CheckboxCard>

              <CheckboxCard
                header={<h4 className="font-semibold text-lg">Pro Plan</h4>}
                checked={proPlanChecked}
                onChange={(checked) => {
                  setProPlanChecked(checked)
                  showToast(`Pro Plan ${checked ? 'selected' : 'deselected'}`, 'info')
                }}
              >
                <div className="space-y-2">
                  <p className="text-2xl font-bold text-primary">$29<span className="text-sm font-normal text-gray-600 dark:text-gray-400">/month</span></p>
                  <ul className="text-sm text-gray-600 dark:text-gray-400 space-y-1">
                    <li>✓ Unlimited Projects</li>
                    <li>✓ 50GB Storage</li>
                    <li>✓ Priority Support</li>
                  </ul>
                </div>
              </CheckboxCard>

              <CheckboxCard
                header={<h4 className="font-semibold text-lg">Enterprise</h4>}
                checked={false}
                disabled
                onChange={(checked) => showToast(`Enterprise ${checked ? 'selected' : 'deselected'}`, 'info')}
              >
                <div className="space-y-2">
                  <p className="text-2xl font-bold text-primary">$99<span className="text-sm font-normal text-gray-600 dark:text-gray-400">/month</span></p>
                  <ul className="text-sm text-gray-600 dark:text-gray-400 space-y-1">
                    <li>✓ Unlimited Everything</li>
                    <li>✓ 1TB Storage</li>
                    <li>✓ 24/7 Support</li>
                  </ul>
                </div>
              </CheckboxCard>
            </div>

            <div className="mt-6">
              <h4 className="text-sm font-semibold text-gray-900 dark:text-gray-100 mb-3">Feature Selection Cards</h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <CheckboxCard
                  checkboxPosition="top-left"
                  checked={feature1Checked}
                  onChange={(checked) => {
                    setFeature1Checked(checked)
                    showToast(`Feature 1 ${checked ? 'enabled' : 'disabled'}`, 'info')
                  }}
                >
                  <div className="flex items-start gap-3">
                    <div className="flex-shrink-0 w-10 h-10 rounded-lg bg-primary/10 dark:bg-primary/20 flex items-center justify-center">
                      <StarIcon className="h-6 w-6 text-primary" />
                    </div>
                    <div>
                      <h5 className="font-semibold mb-1">Advanced Analytics</h5>
                      <p className="text-sm text-gray-600 dark:text-gray-400">
                        Get detailed insights and reports about your data
                      </p>
                    </div>
                  </div>
                </CheckboxCard>

                <CheckboxCard
                  checkboxPosition="top-left"
                  checked={feature2Checked}
                  onChange={(checked) => {
                    setFeature2Checked(checked)
                    showToast(`Feature 2 ${checked ? 'enabled' : 'disabled'}`, 'info')
                  }}
                >
                  <div className="flex items-start gap-3">
                    <div className="flex-shrink-0 w-10 h-10 rounded-lg bg-primary/10 dark:bg-primary/20 flex items-center justify-center">
                      <CreditCardIcon className="h-6 w-6 text-primary" />
                    </div>
                    <div>
                      <h5 className="font-semibold mb-1">Payment Processing</h5>
                      <p className="text-sm text-gray-600 dark:text-gray-400">
                        Accept payments securely with multiple gateways
                      </p>
                    </div>
                  </div>
                </CheckboxCard>
              </div>
            </div>

            <div className="mt-6">
              <h4 className="text-sm font-semibold text-gray-900 dark:text-gray-100 mb-3">Card with Footer</h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <CheckboxCard
                  header={<h4 className="font-semibold">Premium Support</h4>}
                  footer={<Button size="sm" variant="outline" className="w-full">Learn More</Button>}
                  checked={premiumSupportChecked}
                  onChange={(checked) => {
                    setPremiumSupportChecked(checked)
                    showToast(`Premium Support ${checked ? 'selected' : 'deselected'}`, 'info')
                  }}
                >
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    Get priority support with faster response times and dedicated assistance.
                  </p>
                </CheckboxCard>

                <CheckboxCard
                  header={<h4 className="font-semibold">API Access</h4>}
                  footer={<Badge variant="success">Recommended</Badge>}
                  checked={apiAccessChecked}
                  onChange={(checked) => {
                    setApiAccessChecked(checked)
                    showToast(`API Access ${checked ? 'selected' : 'deselected'}`, 'info')
                  }}
                >
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    Integrate with our RESTful API to build custom solutions.
                  </p>
                </CheckboxCard>
              </div>
            </div>
          </div>
          <Divider />
          <div>
            <h3 className="text-lg font-medium mb-3">Radio Buttons</h3>
            <div className="space-y-3">
              <Radio name="option" label="Option 1" value="1" defaultChecked />
              <Radio name="option" label="Option 2" value="2" />
              <Radio name="option" label="Option 3" value="3" />
              <Radio name="option-disabled" label="Disabled option" value="4" disabled />
            </div>
          </div>
          <Divider />
          <div>
            <h3 className="text-lg font-medium mb-3">Switches</h3>
            <div className="space-y-3">
              <Switch label="Enable notifications" defaultChecked />
              <Switch label="Dark mode" />
              <Switch label="Disabled switch" disabled />
            </div>
          </div>
          <Divider />
          <div>
            <h3 className="text-lg font-medium mb-3">Select Dropdown</h3>
            <Select
              label="Choose an option"
              placeholder="Select an option"
              options={[
                { value: '1', label: 'Option 1' },
                { value: '2', label: 'Option 2' },
                { value: '3', label: 'Option 3' },
                { value: '4', label: 'Disabled Option', disabled: true },
              ]}
            />
          </div>
          <Divider />
          <div>
            <h3 className="text-lg font-medium mb-3">Textarea</h3>
            <Textarea
              label="Message"
              placeholder="Enter your message here..."
              rows={4}
            />
          </div>
        </div>
      </Card>
      
      {/* Alerts */}
      <Card header={<h2 className="text-xl font-semibold">Alerts</h2>}>
        <div className="space-y-4">
          <Alert variant="info" title="Information">
            This is an informational alert message.
          </Alert>
          <Alert variant="success" title="Success">
            Your action was completed successfully!
          </Alert>
          <Alert variant="warning" title="Warning">
            Please review your input before proceeding.
          </Alert>
          <Alert variant="error" title="Error" onClose={() => showToast('Alert closed', 'info')}>
            An error occurred. Please try again.
          </Alert>
        </div>
      </Card>
      
      {/* Avatar */}
      <Card header={<h2 className="text-xl font-semibold">Avatars</h2>}>
        <div className="space-y-6">
          <div>
            <h3 className="text-lg font-medium mb-3">Sizes</h3>
            <div className="flex items-center gap-4">
              <Avatar name="John Doe" size="sm" />
              <Avatar name="Jane Smith" size="md" />
              <Avatar name="Bob Johnson" size="lg" />
              <Avatar name="Alice Brown" size="xl" />
            </div>
          </div>
          <Divider />
          <div>
            <h3 className="text-lg font-medium mb-3">With Status</h3>
            <div className="flex items-center gap-4">
              <Avatar name="Online User" status="online" />
              <Avatar name="Offline User" status="offline" />
              <Avatar name="Away User" status="away" />
              <Avatar name="Busy User" status="busy" />
            </div>
          </div>
        </div>
      </Card>
      
      {/* Breadcrumbs */}
      <Card header={<h2 className="text-xl font-semibold">Breadcrumbs</h2>}>
        <Breadcrumbs
          items={[
            { label: 'Products', path: '/products' },
            { label: 'Electronics', path: '/products/electronics' },
            { label: 'Current Page' },
          ]}
        />
      </Card>
      
      {/* Pagination */}
      <Card header={<h2 className="text-xl font-semibold">Pagination</h2>}>
        <div className="space-y-4">
          <Pagination
            currentPage={3}
            totalPages={10}
            onPageChange={(page) => showToast(`Page ${page} selected`, 'info')}
          />
          <Divider label="Without First/Last" />
          <Pagination
            currentPage={5}
            totalPages={20}
            onPageChange={(page) => showToast(`Page ${page} selected`, 'info')}
            showFirstLast={false}
          />
        </div>
      </Card>

      {/* Tables */}
      <Card header={<h2 className="text-xl font-semibold">Tables</h2>}>
        <div className="space-y-8">
          {/* Basic Table */}
          <div>
            <h3 className="text-lg font-medium mb-3">Basic Table</h3>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableCell header>Name</TableCell>
                  <TableCell header>Email</TableCell>
                  <TableCell header>Role</TableCell>
                  <TableCell header align="center">Status</TableCell>
                </TableRow>
              </TableHeader>
              <TableBody>
                {tableData.slice(0, 3).map((row) => (
                  <TableRow key={row.id}>
                    <TableCell>{row.name}</TableCell>
                    <TableCell>{row.email}</TableCell>
                    <TableCell>{row.role}</TableCell>
                    <TableCell align="center">
                      <Badge variant={row.status === 'Active' ? 'success' : 'secondary'}>
                        {row.status}
                      </Badge>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>

          <Divider />

          {/* Sortable Table */}
          <div>
            <h3 className="text-lg font-medium mb-3">Sortable Table</h3>
            <Table striped hoverable>
              <TableHeader>
                <TableRow>
                  <SortableTableHeader
                    sortKey="name"
                    currentSortKey={sortKey}
                    sortDirection={sortDirection}
                    onSort={handleSort}
                  >
                    Name
                  </SortableTableHeader>
                  <SortableTableHeader
                    sortKey="email"
                    currentSortKey={sortKey}
                    sortDirection={sortDirection}
                    onSort={handleSort}
                  >
                    Email
                  </SortableTableHeader>
                  <TableCell header>Role</TableCell>
                  <TableCell header align="center">Status</TableCell>
                </TableRow>
              </TableHeader>
              <TableBody striped hoverable>
                {sortedTableData.map((row) => (
                  <TableRow key={row.id}>
                    <TableCell>{row.name}</TableCell>
                    <TableCell>{row.email}</TableCell>
                    <TableCell>{row.role}</TableCell>
                    <TableCell align="center">
                      <Badge variant={row.status === 'Active' ? 'success' : 'secondary'}>
                        {row.status}
                      </Badge>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>

          <Divider />

          {/* Table with Selection */}
          <div>
            <h3 className="text-lg font-medium mb-3">Table with Row Selection</h3>
            <Table striped hoverable>
              <TableHeader>
                <TableRow>
                  <TableCell header>Name</TableCell>
                  <TableCell header>Email</TableCell>
                  <TableCell header>Role</TableCell>
                  <TableCell header align="center">Status</TableCell>
                  <TableCell header align="right">Actions</TableCell>
                </TableRow>
              </TableHeader>
              <TableBody striped hoverable>
                {tableData.map((row) => (
                  <TableRow
                    key={row.id}
                    selected={selectedRow === row.id}
                    onClick={() => {
                      setSelectedRow(selectedRow === row.id ? null : row.id)
                      showToast(`Row ${row.id} ${selectedRow === row.id ? 'deselected' : 'selected'}`, 'info')
                    }}
                  >
                    <TableCell>{row.name}</TableCell>
                    <TableCell>{row.email}</TableCell>
                    <TableCell>{row.role}</TableCell>
                    <TableCell align="center">
                      <Badge variant={row.status === 'Active' ? 'success' : 'secondary'}>
                        {row.status}
                      </Badge>
                    </TableCell>
                    <TableCell align="right">
                      <div className="flex justify-end gap-2">
                        <Button size="sm" variant="ghost" onClick={(e) => {
                          e.stopPropagation()
                          showToast(`Edit ${row.name}`, 'info')
                        }}>
                          Edit
                        </Button>
                        <Button size="sm" variant="ghost" onClick={(e) => {
                          e.stopPropagation()
                          showToast(`Delete ${row.name}`, 'error')
                        }}>
                          Delete
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>

          <Divider />

          {/* Compact Table */}
          <div>
            <h3 className="text-lg font-medium mb-3">Compact Table</h3>
            <Table compact striped hoverable>
              <TableHeader>
                <TableRow>
                  <TableCell header>ID</TableCell>
                  <TableCell header>Name</TableCell>
                  <TableCell header>Email</TableCell>
                  <TableCell header align="center">Status</TableCell>
                </TableRow>
              </TableHeader>
              <TableBody striped hoverable>
                {tableData.map((row) => (
                  <TableRow key={row.id}>
                    <TableCell>#{row.id}</TableCell>
                    <TableCell>{row.name}</TableCell>
                    <TableCell>{row.email}</TableCell>
                    <TableCell align="center">
                      <Badge variant={row.status === 'Active' ? 'success' : 'secondary'} size="sm">
                        {row.status}
                      </Badge>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>

          <Divider />

          {/* Table with Pagination */}
          <div>
            <h3 className="text-lg font-medium mb-3">Table with Pagination</h3>
            <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
              A fully-featured table component with built-in pagination, items per page selector, and customizable columns.
            </p>
            <TableWithPagination
              data={paginatedTableData}
              columns={paginatedTableColumns}
              itemsPerPage={5}
              itemsPerPageOptions={[5, 10, 15, 20]}
              striped
              hoverable
            />
          </div>
        </div>
      </Card>

      {/* Stepper Section */}
      <Card className="p-6">
        <h2 className="text-2xl font-bold mb-6">Stepper</h2>
        <div className="space-y-8">
          {/* Horizontal Stepper */}
          <div>
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-medium">Horizontal Stepper</h3>
              <div className="flex gap-2">
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => setHorizontalStep(Math.max(0, horizontalStep - 1))}
                  disabled={horizontalStep === 0}
                >
                  Previous
                </Button>
                <Button
                  size="sm"
                  variant="primary"
                  onClick={() => setHorizontalStep(Math.min(3, horizontalStep + 1))}
                  disabled={horizontalStep === 3}
                >
                  Next
                </Button>
                <Button
                  size="sm"
                  variant="ghost"
                  onClick={() => setHorizontalStep(0)}
                >
                  Reset
                </Button>
              </div>
            </div>
            <div className="bg-gray-50 dark:bg-gray-900 p-6 rounded-lg">
              <Stepper
                steps={[
                  {
                    id: 1,
                    title: 'Account',
                    description: 'Create your account',
                  },
                  {
                    id: 2,
                    title: 'Profile',
                    description: 'Complete your profile',
                  },
                  {
                    id: 3,
                    title: 'Review',
                    description: 'Review your information',
                  },
                  {
                    id: 4,
                    title: 'Complete',
                    description: 'Finish setup',
                  },
                ]}
                currentStep={horizontalStep}
                orientation="horizontal"
                clickable
                size="md"
              />
            </div>
          </div>

          {/* Vertical Stepper */}
          <div>
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-medium">Vertical Stepper</h3>
              <div className="flex gap-2">
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => setVerticalStep(Math.max(0, verticalStep - 1))}
                  disabled={verticalStep === 0}
                >
                  Previous
                </Button>
                <Button
                  size="sm"
                  variant="primary"
                  onClick={() => setVerticalStep(Math.min(3, verticalStep + 1))}
                  disabled={verticalStep === 3}
                >
                  Next
                </Button>
                <Button
                  size="sm"
                  variant="ghost"
                  onClick={() => setVerticalStep(0)}
                >
                  Reset
                </Button>
              </div>
            </div>
            <div className="bg-gray-50 dark:bg-gray-900 p-6 rounded-lg">
              <Stepper
                steps={[
                  {
                    id: 1,
                    title: 'Order Placed',
                    description: 'Your order has been placed successfully',
                  },
                  {
                    id: 2,
                    title: 'Processing',
                    description: 'Your order is being processed',
                  },
                  {
                    id: 3,
                    title: 'Shipped',
                    description: 'Your order has been shipped',
                  },
                  {
                    id: 4,
                    title: 'Delivered',
                    description: 'Your order has been delivered',
                  },
                ]}
                currentStep={verticalStep}
                orientation="vertical"
                clickable
                size="md"
              />
            </div>
          </div>

          {/* Stepper with Icons */}
          <div>
            <h3 className="text-lg font-medium mb-4">Stepper with Icons</h3>
            <div className="bg-gray-50 dark:bg-gray-900 p-6 rounded-lg">
              <Stepper
                steps={[
                  {
                    id: 1,
                    title: 'Sign Up',
                    description: 'Create an account',
                    icon: <UserIcon />,
                  },
                  {
                    id: 2,
                    title: 'Choose Plan',
                    description: 'Select your plan',
                    icon: <ShoppingBagIcon />,
                  },
                  {
                    id: 3,
                    title: 'Payment',
                    description: 'Complete payment',
                    icon: <CreditCardIcon />,
                  },
                  {
                    id: 4,
                    title: 'Confirm',
                    description: 'Confirm your order',
                    icon: <CheckCircleIcon />,
                  },
                ]}
                currentStep={1}
                orientation="horizontal"
                size="lg"
              />
            </div>
          </div>

          {/* Stepper with Error State */}
          <div>
            <h3 className="text-lg font-medium mb-4">Stepper with Error State</h3>
            <div className="bg-gray-50 dark:bg-gray-900 p-6 rounded-lg">
              <Stepper
                steps={[
                  {
                    id: 1,
                    title: 'Step 1',
                    description: 'Completed step',
                    status: 'completed',
                  },
                  {
                    id: 2,
                    title: 'Step 2',
                    description: 'Current step',
                    status: 'current',
                  },
                  {
                    id: 3,
                    title: 'Step 3',
                    description: 'Error occurred',
                    status: 'error',
                  },
                  {
                    id: 4,
                    title: 'Step 4',
                    description: 'Pending step',
                    status: 'pending',
                  },
                ]}
                currentStep={1}
                orientation="horizontal"
                size="md"
              />
            </div>
          </div>

          {/* Compact Stepper */}
          <div>
            <h3 className="text-lg font-medium mb-4">Compact Stepper</h3>
            <div className="bg-gray-50 dark:bg-gray-900 p-6 rounded-lg">
              <Stepper
                steps={[
                  { id: 1, title: 'Step 1' },
                  { id: 2, title: 'Step 2' },
                  { id: 3, title: 'Step 3' },
                  { id: 4, title: 'Step 4' },
                ]}
                currentStep={1}
                orientation="horizontal"
                size="sm"
                showStepNumber={false}
              />
            </div>
          </div>
        </div>
      </Card>

      {/* Slider */}
      <Card className="p-6">
        <h2 className="text-2xl font-bold mb-6">Slider</h2>
        <div className="space-y-8">
          {/* Basic Slider */}
          <div>
            <h3 className="text-lg font-medium mb-4">Basic Slider</h3>
            <div className="max-w-md">
              <Slider
                value={sliderValue}
                onChange={setSliderValue}
                min={0}
                max={100}
                step={1}
                label="Volume"
              />
            </div>
          </div>

          {/* Slider Sizes */}
          <div>
            <h3 className="text-lg font-medium mb-4">Slider Sizes</h3>
            <div className="space-y-6 max-w-md">
              <Slider value={30} min={0} max={100} size="sm" label="Small" />
              <Slider value={50} min={0} max={100} size="md" label="Medium" />
              <Slider value={70} min={0} max={100} size="lg" label="Large" />
            </div>
          </div>

          {/* Slider with Marks */}
          <div>
            <h3 className="text-lg font-medium mb-4">Slider with Marks</h3>
            <div className="max-w-md">
              <Slider
                value={sliderValue}
                onChange={setSliderValue}
                min={0}
                max={100}
                step={10}
                marks={true}
                label="Volume with Marks"
              />
            </div>
          </div>

          {/* Disabled Slider */}
          <div>
            <h3 className="text-lg font-medium mb-4">Disabled Slider</h3>
            <div className="max-w-md">
              <Slider value={50} min={0} max={100} disabled label="Disabled" />
            </div>
          </div>

          {/* Slider with Custom Format */}
          <div>
            <h3 className="text-lg font-medium mb-4">Slider with Custom Format</h3>
            <div className="max-w-md">
              <Slider
                value={sliderValue}
                onChange={setSliderValue}
                min={0}
                max={100}
                formatLabel={(val) => `${val}%`}
                label="Percentage"
              />
            </div>
          </div>

          {/* Slider with Error */}
          <div>
            <h3 className="text-lg font-medium mb-4">Slider with Error</h3>
            <div className="max-w-md">
              <Slider
                value={sliderValue}
                onChange={setSliderValue}
                min={0}
                max={100}
                error="This field is required"
                label="Volume with Error"
              />
            </div>
          </div>
        </div>
      </Card>

      {/* Rating */}
      <Card className="p-6">
        <h2 className="text-2xl font-bold mb-6">Rating</h2>
        <div className="space-y-8">
          {/* Basic Rating */}
          <div>
            <h3 className="text-lg font-medium mb-4">Basic Rating</h3>
            <Rating
              value={ratingValue}
              onChange={setRatingValue}
              max={5}
              label="Rate this product"
            />
          </div>

          {/* Rating Sizes */}
          <div>
            <h3 className="text-lg font-medium mb-4">Rating Sizes</h3>
            <div className="space-y-4">
              <Rating value={3} max={5} size="sm" readOnly />
              <Rating value={3} max={5} size="md" readOnly />
              <Rating value={3} max={5} size="lg" readOnly />
              <Rating value={3} max={5} size="xl" readOnly />
            </div>
          </div>

          {/* Rating Variants */}
          <div>
            <h3 className="text-lg font-medium mb-4">Rating Variants</h3>
            <div className="space-y-4">
              <Rating value={4} max={5} variant="primary" readOnly label="Primary" />
              <Rating value={4} max={5} variant="warning" readOnly label="Warning" />
              <Rating value={4} max={5} variant="success" readOnly label="Success" />
              <Rating value={4} max={5} variant="danger" readOnly label="Danger" />
            </div>
          </div>

          {/* Rating with Half Stars */}
          <div>
            <h3 className="text-lg font-medium mb-4">Rating with Half Stars</h3>
            <Rating
              value={ratingValue}
              onChange={setRatingValue}
              max={5}
              allowHalf
              label="Rate with Half Stars"
            />
          </div>

          {/* Rating with Labels */}
          <div>
            <h3 className="text-lg font-medium mb-4">Rating with Labels</h3>
            <Rating
              value={ratingValue}
              onChange={setRatingValue}
              max={5}
              showLabels
              labels={['Poor', 'Fair', 'Good', 'Very Good', 'Excellent']}
              label="Rate this service"
            />
          </div>

          {/* Read-only Rating */}
          <div>
            <h3 className="text-lg font-medium mb-4">Read-only Rating</h3>
            <Rating value={4.5} max={5} readOnly allowHalf label="Average Rating" />
          </div>

          {/* Rating with Allow Clear */}
          <div>
            <h3 className="text-lg font-medium mb-4">Rating with Allow Clear</h3>
            <Rating
              value={ratingValue}
              onChange={setRatingValue}
              max={5}
              allowClear
              label="Click same star to clear"
              helperText="Click the same star again to clear the rating"
            />
          </div>
        </div>
      </Card>

      {/* Headless UI Components */}
      <Card className="p-6">
        <h2 className="text-2xl font-bold mb-6">Headless UI Components</h2>
        <div className="space-y-8">
          {/* Listbox */}
          <div>
            <h3 className="text-lg font-medium mb-4">Listbox (Select)</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Listbox
                label="Select an option"
                placeholder="Choose..."
                options={[
                  { value: 'option1', label: 'Option 1' },
                  { value: 'option2', label: 'Option 2' },
                  { value: 'option3', label: 'Option 3' },
                  { value: 'option4', label: 'Option 4', disabled: true },
                ]}
                value={listboxValue}
                onChange={setListboxValue}
              />
              <Listbox
                label="Listbox with Icons"
                placeholder="Select with icon..."
                options={[
                  { value: 'user', label: 'User', icon: <UserIcon className="w-5 h-5" /> },
                  { value: 'cart', label: 'Shopping Cart', icon: <ShoppingBagIcon className="w-5 h-5" /> },
                  { value: 'card', label: 'Credit Card', icon: <CreditCardIcon className="w-5 h-5" /> },
                ]}
                size="lg"
              />
            </div>
          </div>

          {/* Combobox */}
          <div>
            <h3 className="text-lg font-medium mb-4">Combobox (Autocomplete)</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Combobox
                label="Search and select"
                placeholder="Type to search..."
                options={[
                  { value: 'react', label: 'React' },
                  { value: 'vue', label: 'Vue.js' },
                  { value: 'angular', label: 'Angular' },
                  { value: 'svelte', label: 'Svelte' },
                  { value: 'nextjs', label: 'Next.js' },
                  { value: 'nuxt', label: 'Nuxt.js' },
                ]}
                value={comboboxValue}
                onChange={setComboboxValue}
              />
              <Combobox
                label="Combobox with Icons"
                placeholder="Search frameworks..."
                options={[
                  { value: 'react', label: 'React', icon: <CheckCircleIcon className="w-5 h-5" /> },
                  { value: 'vue', label: 'Vue.js', icon: <CheckCircleIcon className="w-5 h-5" /> },
                  { value: 'angular', label: 'Angular', icon: <CheckCircleIcon className="w-5 h-5" /> },
                ]}
              />
            </div>
          </div>

          {/* RadioGroup */}
          <div>
            <h3 className="text-lg font-medium mb-4">RadioGroup</h3>
            <div className="space-y-6">
              <RadioGroup
                label="Select an option"
                options={[
                  { value: 'option1', label: 'Option 1', description: 'First option' },
                  { value: 'option2', label: 'Option 2', description: 'Second option' },
                  { value: 'option3', label: 'Option 3', description: 'Third option' },
                  { value: 'option4', label: 'Option 4 (Disabled)', description: 'Disabled option', disabled: true },
                ]}
                value={radioGroupValue}
                onChange={setRadioGroupValue}
              />
              <RadioGroup
                label="Horizontal RadioGroup"
                options={[
                  { value: 'small', label: 'Small', icon: <Badge>Small</Badge> },
                  { value: 'medium', label: 'Medium', icon: <Badge>Medium</Badge> },
                  { value: 'large', label: 'Large', icon: <Badge>Large</Badge> },
                ]}
                orientation="horizontal"
                defaultValue="medium"
              />
            </div>
          </div>

          {/* Popover */}
          <div>
            <h3 className="text-lg font-medium mb-4">Popover</h3>
            <div className="flex flex-wrap gap-4">
              <Popover
                trigger={
                  <Button variant="primary">
                    Open Popover (Bottom)
                  </Button>
                }
                position="bottom"
              >
                <div className="p-4">
                  <h4 className="font-semibold text-gray-900 dark:text-gray-100 mb-2">Popover Title</h4>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    This is a popover positioned at the bottom of the trigger button.
                  </p>
                </div>
              </Popover>

              <Popover
                trigger={
                  <Button variant="outline">
                    Open Popover (Top)
                  </Button>
                }
                position="top"
              >
                <div className="p-4">
                  <h4 className="font-semibold text-gray-900 dark:text-gray-100 mb-2">Popover Title</h4>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    This is a popover positioned at the top of the trigger button.
                  </p>
                </div>
              </Popover>

              <Popover
                trigger={
                  <Button variant="secondary">
                    <InformationCircleIcon className="w-5 h-5 mr-2" />
                    Info Popover
                  </Button>
                }
                position="right"
              >
                <div className="p-4 max-w-xs">
                  <div className="flex items-start gap-2">
                    <InformationCircleIcon className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                    <div>
                      <h4 className="font-semibold text-gray-900 dark:text-gray-100 mb-2">Information</h4>
                      <p className="text-sm text-gray-600 dark:text-gray-400">
                        This popover contains additional information about the action.
                      </p>
                    </div>
                  </div>
                </div>
              </Popover>
            </div>
          </div>
        </div>
      </Card>

      {/* EmptyState */}
      <Card className="p-6">
        <h2 className="text-2xl font-bold mb-6">EmptyState</h2>
        <div className="space-y-8">
          {/* Basic EmptyState */}
          <div>
            <h3 className="text-lg font-medium mb-4">Basic EmptyState</h3>
            <div className="border border-gray-200 dark:border-gray-700 rounded-lg">
              <EmptyState
                title="No items found"
                description="There are no items to display at this time."
              />
            </div>
          </div>

          {/* EmptyState with Icon */}
          <div>
            <h3 className="text-lg font-medium mb-4">EmptyState with Icon</h3>
            <div className="border border-gray-200 dark:border-gray-700 rounded-lg">
              <EmptyState
                icon={<CheckCircleIcon className="w-16 h-16 text-gray-400" />}
                title="No data available"
                description="Start by creating your first item to see it here."
              />
            </div>
          </div>

          {/* EmptyState with Actions */}
          <div>
            <h3 className="text-lg font-medium mb-4">EmptyState with Actions</h3>
            <div className="border border-gray-200 dark:border-gray-700 rounded-lg">
              <EmptyState
                icon={<UserIcon className="w-16 h-16 text-gray-400" />}
                title="No users found"
                description="Get started by creating a new user account."
                action={
                  <Button onClick={() => showToast('Create user clicked', 'success')}>
                    Create User
                  </Button>
                }
                secondaryAction={
                  <Button variant="outline" onClick={() => showToast('Import clicked', 'info')}>
                    Import Users
                  </Button>
                }
              />
            </div>
          </div>

          {/* EmptyState Sizes */}
          <div>
            <h3 className="text-lg font-medium mb-4">EmptyState Sizes</h3>
            <div className="space-y-4">
              <div className="border border-gray-200 dark:border-gray-700 rounded-lg">
                <EmptyState
                  icon={<XCircleIcon className="w-12 h-12 text-gray-400" />}
                  title="Small EmptyState"
                  description="Small size variant."
                  size="sm"
                />
              </div>
              <div className="border border-gray-200 dark:border-gray-700 rounded-lg">
                <EmptyState
                  icon={<ShoppingBagIcon className="w-16 h-16 text-gray-400" />}
                  title="Medium EmptyState"
                  description="Medium size variant (default)."
                  size="md"
                />
              </div>
              <div className="border border-gray-200 dark:border-gray-700 rounded-lg">
                <EmptyState
                  icon={<CreditCardIcon className="w-24 h-24 text-gray-400" />}
                  title="Large EmptyState"
                  description="Large size variant."
                  size="lg"
                />
              </div>
            </div>
          </div>

          {/* EmptyState for Different Scenarios */}
          <div>
            <h3 className="text-lg font-medium mb-4">EmptyState Examples</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="border border-gray-200 dark:border-gray-700 rounded-lg">
                <EmptyState
                  icon={<TruckIcon className="w-16 h-16 text-gray-400" />}
                  title="No orders yet"
                  description="When you receive orders, they'll appear here."
                  action={<Button>Browse Products</Button>}
                />
              </div>
              <div className="border border-gray-200 dark:border-gray-700 rounded-lg">
                <EmptyState
                  icon={<ShoppingBagIcon className="w-16 h-16 text-gray-400" />}
                  title="Your cart is empty"
                  description="Add items to your cart to get started."
                  action={<Button>Start Shopping</Button>}
                />
              </div>
            </div>
          </div>
        </div>
      </Card>

      {/* Chip/Tag */}
      <Card className="p-6">
        <h2 className="text-2xl font-bold mb-6">Chip / Tag</h2>
        <div className="space-y-8">
          <div>
            <h3 className="text-lg font-medium mb-4">Basic Chips</h3>
            <div className="flex flex-wrap gap-2">
              <Chip variant="primary">Primary</Chip>
              <Chip variant="secondary">Secondary</Chip>
              <Chip variant="success">Success</Chip>
              <Chip variant="warning">Warning</Chip>
              <Chip variant="danger">Danger</Chip>
              <Chip variant="info">Info</Chip>
              <Chip variant="outline">Outline</Chip>
            </div>
          </div>

          <div>
            <h3 className="text-lg font-medium mb-4">Removable Chips</h3>
            <div className="flex flex-wrap gap-2">
              {selectedChips.map((chip) => (
                <Chip
                  key={chip}
                  variant="primary"
                  removable
                  onRemove={() => setSelectedChips(selectedChips.filter((c) => c !== chip))}
                >
                  {chip}
                </Chip>
              ))}
              <Chip variant="success" removable onRemove={() => showToast('Chip removed', 'info')}>
                Removable
              </Chip>
            </div>
          </div>

          <div>
            <h3 className="text-lg font-medium mb-4">Chips with Icons</h3>
            <div className="flex flex-wrap gap-2">
              <Chip variant="primary" icon={<StarIcon className="w-4 h-4" />}>
                Featured
              </Chip>
              <Chip variant="success" icon={<CheckCircleIcon className="w-4 h-4" />}>
                Verified
              </Chip>
              <Chip variant="warning" icon={<BellIcon className="w-4 h-4" />} removable>
                Notification
              </Chip>
            </div>
          </div>

          <div>
            <h3 className="text-lg font-medium mb-4">Chip Sizes</h3>
            <div className="flex flex-wrap items-center gap-2">
              <Chip size="sm" variant="primary">Small</Chip>
              <Chip size="md" variant="primary">Medium</Chip>
              <Chip size="lg" variant="primary">Large</Chip>
            </div>
          </div>
        </div>
      </Card>

      {/* Dropdown */}
      <Card className="p-6">
        <h2 className="text-2xl font-bold mb-6">Dropdown</h2>
        <div className="space-y-8">
          <div>
            <h3 className="text-lg font-medium mb-4">Basic Dropdown</h3>
            <Dropdown
              options={[
                { value: 'option1', label: 'Option 1' },
                { value: 'option2', label: 'Option 2' },
                { value: 'option3', label: 'Option 3' },
              ]}
              value={dropdownValue}
              onChange={setDropdownValue}
              placeholder="Select an option"
            />
          </div>

          <div>
            <h3 className="text-lg font-medium mb-4">Dropdown with Icons</h3>
            <Dropdown
              options={[
                { value: 'home', label: 'Home', icon: <HomeIcon className="w-5 h-5" /> },
                { value: 'documents', label: 'Documents', icon: <DocumentIcon className="w-5 h-5" /> },
                { value: 'settings', label: 'Settings', icon: <Cog6ToothIcon className="w-5 h-5" /> },
              ]}
              placeholder="Choose an option"
            />
          </div>

          <div>
            <h3 className="text-lg font-medium mb-4">Dropdown Sizes</h3>
            <div className="space-y-4">
              <Dropdown
                size="sm"
                options={[
                  { value: '1', label: 'Small Option 1' },
                  { value: '2', label: 'Small Option 2' },
                ]}
                placeholder="Small dropdown"
              />
              <Dropdown
                size="md"
                options={[
                  { value: '1', label: 'Medium Option 1' },
                  { value: '2', label: 'Medium Option 2' },
                ]}
                placeholder="Medium dropdown"
              />
              <Dropdown
                size="lg"
                options={[
                  { value: '1', label: 'Large Option 1' },
                  { value: '2', label: 'Large Option 2' },
                ]}
                placeholder="Large dropdown"
              />
            </div>
          </div>
        </div>
      </Card>

      {/* Drawer */}
      <Card className="p-6">
        <h2 className="text-2xl font-bold mb-6">Drawer / SideSheet</h2>
        <div className="space-y-8">
          <div>
            <h3 className="text-lg font-medium mb-4">Drawer Positions</h3>
            <div className="flex flex-wrap gap-4">
              <Button onClick={() => { setDrawerPosition('left'); setIsDrawerOpen(true); }}>
                Open Left Drawer
              </Button>
              <Button onClick={() => { setDrawerPosition('right'); setIsDrawerOpen(true); }}>
                Open Right Drawer
              </Button>
              <Button onClick={() => { setDrawerPosition('top'); setIsDrawerOpen(true); }}>
                Open Top Drawer
              </Button>
              <Button onClick={() => { setDrawerPosition('bottom'); setIsDrawerOpen(true); }}>
                Open Bottom Drawer
              </Button>
            </div>
          </div>

          <div>
            <h3 className="text-lg font-medium mb-4">Drawer Sizes</h3>
            <div className="flex flex-wrap gap-4">
              <Button onClick={() => { setDrawerPosition('right'); setIsDrawerOpen(true); }}>
                Open Drawer (Default)
              </Button>
            </div>
          </div>
        </div>
      </Card>

      <Drawer
        isOpen={isDrawerOpen}
        onClose={() => setIsDrawerOpen(false)}
        title="Drawer Title"
        position={drawerPosition}
        size="md"
      >
        <div className="space-y-4">
          <p className="text-gray-600 dark:text-gray-400">
            This is a drawer component. It can slide in from any side of the screen.
          </p>
          <p className="text-gray-600 dark:text-gray-400">
            You can add any content here, including forms, lists, or other components.
          </p>
          <Button onClick={() => setIsDrawerOpen(false)}>Close Drawer</Button>
        </div>
      </Drawer>

      {/* DatePicker */}
      <Card className="p-6">
        <h2 className="text-2xl font-bold mb-6">DatePicker</h2>
        <div className="space-y-8">
          <div>
            <h3 className="text-lg font-medium mb-4">Basic DatePicker</h3>
            <DatePicker
              label="Select a date"
              value={dateValue}
              onChange={setDateValue}
              placeholder="Choose a date"
            />
          </div>

          <div>
            <h3 className="text-lg font-medium mb-4">DatePicker with Min/Max</h3>
            <DatePicker
              label="Select date range"
              min="2024-01-01"
              max="2024-12-31"
              helperText="Select a date between January and December 2024"
            />
          </div>

          <div>
            <h3 className="text-lg font-medium mb-4">DatePicker with Error</h3>
            <DatePicker
              label="Date with error"
              error="This field is required"
            />
          </div>
        </div>
      </Card>

      {/* Command Palette */}
      <Card className="p-6">
        <h2 className="text-2xl font-bold mb-6">Command Palette</h2>
        <div className="space-y-8">
          <div>
            <h3 className="text-lg font-medium mb-4">Command Palette</h3>
            <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
              Press the button below or use Ctrl+K (Cmd+K on Mac) to open the command palette.
            </p>
            <Button onClick={() => setIsCommandPaletteOpen(true)}>
              Open Command Palette
            </Button>
          </div>
        </div>
      </Card>

      <CommandPalette
        isOpen={isCommandPaletteOpen}
        onClose={() => setIsCommandPaletteOpen(false)}
        options={[
          {
            id: 'home',
            label: 'Go to Home',
            description: 'Navigate to the home page',
            icon: <HomeIcon className="w-5 h-5" />,
            keywords: ['home', 'dashboard', 'main'],
            group: 'Navigation',
            action: () => showToast('Navigating to Home', 'info'),
          },
          {
            id: 'documents',
            label: 'Open Documents',
            description: 'View all documents',
            icon: <DocumentIcon className="w-5 h-5" />,
            keywords: ['documents', 'files', 'docs'],
            group: 'Navigation',
            action: () => showToast('Opening Documents', 'info'),
          },
          {
            id: 'settings',
            label: 'Open Settings',
            description: 'Configure application settings',
            icon: <Cog6ToothIcon className="w-5 h-5" />,
            keywords: ['settings', 'preferences', 'config'],
            group: 'Navigation',
            action: () => showToast('Opening Settings', 'info'),
          },
          {
            id: 'search',
            label: 'Search',
            description: 'Search across the application',
            icon: <MagnifyingGlassIcon className="w-5 h-5" />,
            keywords: ['search', 'find', 'query'],
            group: 'Actions',
            action: () => showToast('Opening Search', 'info'),
          },
          {
            id: 'command',
            label: 'Run Command',
            description: 'Execute a system command',
            icon: <CommandLineIcon className="w-5 h-5" />,
            keywords: ['command', 'run', 'execute'],
            group: 'Actions',
            action: () => showToast('Running Command', 'info'),
          },
        ]}
      />
    </div>
  )
}

export default Components

