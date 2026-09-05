import React, { useState, useEffect } from 'react';
import {
  FolderGit2,
  FileSpreadsheet,
  FileText,
  Mail,
  CheckSquare,
  GraduationCap,
  ExternalLink,
  Plus,
  RefreshCw,
  Trash2,
  Send,
  AlertTriangle,
  CheckCircle2,
  Database,
  Cloud,
  Sparkles,
  Search,
  Upload,
} from 'lucide-react';
import { User } from 'firebase/auth';
import {
  listDriveFiles,
  createDriveTextFile,
  createSEOSpreadsheet,
  createSEODocument,
  sendGmailSummary,
  listTasks,
  createGoogleTask,
  listClassroomCourses,
  listClassroomCourseWork,
  createClassroomAnnouncement,
  DriveFile,
  GoogleTaskItem,
  ClassroomCourse,
  ClassroomCourseWork,
} from '../lib/workspace';

interface WorkspaceHubProps {
  user: User | null;
  accessToken: string | null;
  onSignIn: () => void;
  onSignOut: () => void;
  studentName: string;
  activeWeekTitle?: string;
  checklistCount?: number;
  studyDurationMinutes?: number;
  completedWeeksCount: number;
  avgQuizScore: number;
  totalStudySeconds: number;
}

type WorkspaceSubTab = 'drive' | 'sheets' | 'docs' | 'gmail' | 'tasks' | 'classroom';

export const WorkspaceHub: React.FC<WorkspaceHubProps> = ({
  user,
  accessToken,
  onSignIn,
  onSignOut,
  studentName,
  activeWeekTitle = 'SEO Fundamentals & Keyword Research',
  checklistCount = 5,
  studyDurationMinutes = 45,
  completedWeeksCount,
  avgQuizScore,
  totalStudySeconds,
}) => {
  const [activeSubTab, setActiveSubTab] = useState<WorkspaceSubTab>('drive');
  const [loading, setLoading] = useState(false);
  const [statusMessage, setStatusMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);

  const formatStudyTime = (seconds: number) => {
    const h = Math.floor(seconds / 3600);
    const m = Math.floor((seconds % 3600) / 60);
    return `${h}h ${m}m`;
  };

  const handleSyncProgressReportToSheets = () => {
    setConfirmModal({
      isOpen: true,
      title: 'Sync Academic Progress to Google Sheets?',
      description: 'This will generate a comprehensive "SEO Ustaad Learning Report" in your Google Sheets account, including your 12-week journey stats, total study time, and quiz accuracy.',
      actionLabel: 'Sync to Sheets',
      onConfirm: async () => {
        setLoading(true);
        try {
          const headers = ['Metric', 'Value', 'Description'];
          const rows = [
            ['Student Name', studentName, 'Official name on record'],
            ['Course Status', `${completedWeeksCount} / 12 Weeks`, 'Modules successfully completed'],
            ['Total Study Time', formatStudyTime(totalStudySeconds), 'Total time logged in active learning'],
            ['Average Quiz Score', `${avgQuizScore}%`, 'Cumulative accuracy across all attempts'],
            ['Last Activity', new Date().toLocaleString(), 'Timestamp of last sync'],
            ['Academic Level', avgQuizScore >= 80 ? 'Expert' : 'Practitioner', 'Calculated based on quiz performance'],
          ];
          const result = await createSEOSpreadsheet(`SEO Ustaad - Progress Report (${studentName})`, headers, rows);
          setCreatedSheets((prev) => [{ title: 'Academic Progress Report', url: result.spreadsheetUrl }, ...prev]);
          showNotification('success', 'Your learning report has been synced to Google Sheets!');
        } catch (err: any) {
          showNotification('error', `Failed to sync report: ${err.message}`);
        } finally {
          setLoading(false);
        }
      },
    });
  };

  // Drive state
  const [driveFiles, setDriveFiles] = useState<DriveFile[]>([]);
  const [driveSearch, setDriveSearch] = useState('');

  // Sheets state
  const [createdSheets, setCreatedSheets] = useState<{ title: string; url: string }[]>([]);

  // Docs state
  const [createdDocs, setCreatedDocs] = useState<{ title: string; url: string }[]>([]);

  // Tasks state
  const [tasks, setTasks] = useState<GoogleTaskItem[]>([]);
  const [newTaskTitle, setNewTaskTitle] = useState('');

  // Classroom state
  const [courses, setCourses] = useState<ClassroomCourse[]>([]);
  const [selectedCourseId, setSelectedCourseId] = useState<string>('');
  const [courseWork, setCourseWork] = useState<ClassroomCourseWork[]>([]);

  // Confirmation Modal state for destructive/mutating actions
  const [confirmModal, setConfirmModal] = useState<{
    isOpen: boolean;
    title: string;
    description: string;
    actionLabel: string;
    isDestructive?: boolean;
    onConfirm: () => Promise<void>;
  }>({
    isOpen: false,
    title: '',
    description: '',
    actionLabel: 'Confirm',
    onConfirm: async () => {},
  });

  const showNotification = (type: 'success' | 'error', text: string) => {
    setStatusMessage({ type, text });
    setTimeout(() => setStatusMessage(null), 5000);
  };

  // Load active tab data when accessToken is available
  useEffect(() => {
    if (!accessToken) return;

    if (activeSubTab === 'drive') {
      loadDriveFiles();
    } else if (activeSubTab === 'tasks') {
      loadTasks();
    } else if (activeSubTab === 'classroom') {
      loadClassroom();
    }
  }, [accessToken, activeSubTab]);

  const loadDriveFiles = async () => {
    if (!accessToken) return;
    setLoading(true);
    try {
      const files = await listDriveFiles();
      setDriveFiles(files);
    } catch (err: any) {
      showNotification('error', `Failed to load Drive files: ${err.message}`);
    } finally {
      setLoading(false);
    }
  };

  const loadTasks = async () => {
    if (!accessToken) return;
    setLoading(true);
    try {
      const items = await listTasks();
      setTasks(items);
    } catch (err: any) {
      showNotification('error', `Failed to load Tasks: ${err.message}`);
    } finally {
      setLoading(false);
    }
  };

  const loadClassroom = async () => {
    if (!accessToken) return;
    setLoading(true);
    try {
      const courseList = await listClassroomCourses();
      setCourses(courseList);
      if (courseList.length > 0 && !selectedCourseId) {
        setSelectedCourseId(courseList[0].id);
        const work = await listClassroomCourseWork(courseList[0].id);
        setCourseWork(work);
      }
    } catch (err: any) {
      showNotification('error', `Failed to load Classroom courses: ${err.message}`);
    } finally {
      setLoading(false);
    }
  };

  // Mutating Action Handlers with Confirmation Dialogs
  const handleCreateDriveAudit = () => {
    setConfirmModal({
      isOpen: true,
      title: 'Create SEO Audit File in Google Drive?',
      description: `This will create a new document file titled "SEO_Ustaad_Audit_Notes_${new Date().toISOString().split('T')[0]}.txt" in your root Google Drive folder with permission from your account.`,
      actionLabel: 'Create File',
      onConfirm: async () => {
        setLoading(true);
        try {
          const content = `SEO Ustaad - Digital Marketing & Technical SEO Audit Report\nStudent: ${studentName}\nTopic: ${activeWeekTitle}\nDate: ${new Date().toLocaleDateString()}\n\n1. Canonical Tags: Configured\n2. Robots.txt: Validated\n3. Keyword Intent: Commercial & Informational\n4. Core Web Vitals: LCP < 2.5s, CLS < 0.1, INP < 200ms\n\nGenerated with SEO Ustaad LMS.`;
          await createDriveTextFile(`SEO_Ustaad_Audit_Notes_${new Date().toISOString().split('T')[0]}.txt`, content);
          showNotification('success', 'Successfully created SEO audit file in your Google Drive!');
          await loadDriveFiles();
        } catch (err: any) {
          showNotification('error', `Error creating file: ${err.message}`);
        } finally {
          setLoading(false);
        }
      },
    });
  };

  const handleCreateSheet = () => {
    setConfirmModal({
      isOpen: true,
      title: 'Create Google Sheet for Keyword Matrix?',
      description: 'This will create a new Google Spreadsheet in your account titled "SEO Keyword Research Matrix" with starter high-intent keywords, search volume, and Pakistani e-commerce examples.',
      actionLabel: 'Create Sheet',
      onConfirm: async () => {
        setLoading(true);
        try {
          const headers = ['Keyword (کی ورڈ)', 'Urdu Intent', 'Intent Type', 'Avg Volume', 'Difficulty (KD%)', 'CPC (PKR)', 'Target URL'];
          const rows = [
            ['best seo course in pakistan', 'آن لائن کورس تلاش', 'Commercial', 4500, 28, 120, '/courses/seo'],
            ['learn digital marketing lahore', 'لاہور میں ٹریننگ', 'Transactional', 3200, 34, 180, '/institutes/lahore'],
            ['technical seo checklist 2026', 'تکنیکی آڈٹ رہنمائی', 'Informational', 8900, 42, 210, '/checklist'],
            ['urdu keyword research tool free', 'مفت اردو ٹول', 'Transactional', 1600, 19, 95, '/tools/keywords'],
            ['how to write robots.txt', 'فائل بنانے کا طریقہ', 'Informational', 5400, 22, 110, '/guides/robots-txt'],
          ];
          const result = await createSEOSpreadsheet(`SEO Ustaad - Keyword Matrix (${new Date().toLocaleDateString()})`, headers, rows);
          setCreatedSheets((prev) => [{ title: 'SEO Keyword Research Matrix', url: result.spreadsheetUrl }, ...prev]);
          showNotification('success', 'Spreadsheet created in your Google Sheets!');
        } catch (err: any) {
          showNotification('error', `Failed to create spreadsheet: ${err.message}`);
        } finally {
          setLoading(false);
        }
      },
    });
  };

  const handleCreateDoc = () => {
    setConfirmModal({
      isOpen: true,
      title: 'Create Google Doc for Lesson Guide?',
      description: `This will generate a new Google Document in your Drive containing full study notes, bilingual explanations, and client pitch tips for "${activeWeekTitle}".`,
      actionLabel: 'Create Doc',
      onConfirm: async () => {
        setLoading(true);
        try {
          const body = `# ${activeWeekTitle}\nStudent: ${studentName}\nDate: ${new Date().toLocaleDateString()}\n\n## 1. Core Technical Foundations\nSearch engines use three primary stages: Crawling, Indexing, and Ranking. In the Pakistani market, ensure mobile-first rendering and fast server response on 4G networks.\n\n## 2. On-Page Optimization Checklist\n- Title tag: Under 60 characters with primary keyword at start\n- Meta description: 155 characters with clear call to action\n- Clean semantic HTML headings (H1 -> H2 -> H3)\n- Image Alt tags containing descriptive context`;
          const result = await createSEODocument(`SEO Ustaad - ${activeWeekTitle}`, body);
          setCreatedDocs((prev) => [{ title: `Lesson Notes: ${activeWeekTitle}`, url: result.documentUrl }, ...prev]);
          showNotification('success', 'Google Document successfully created!');
        } catch (err: any) {
          showNotification('error', `Failed to create document: ${err.message}`);
        } finally {
          setLoading(false);
        }
      },
    });
  };

  const handleSendGmailSummary = () => {
    if (!user?.email) return;
    setConfirmModal({
      isOpen: true,
      title: 'Send Study Summary via Gmail?',
      description: `This will send an email from your connected Gmail address to "${user.email}" containing your daily stay timer progress (${studyDurationMinutes} mins), completed checklist tasks (${checklistCount}), and current lesson status.`,
      actionLabel: 'Send Email',
      onConfirm: async () => {
        setLoading(true);
        try {
          const subject = `SEO Ustaad Progress Summary - ${new Date().toLocaleDateString()}`;
          const body = `Assalamu Alaikum ${studentName},\n\nHere is your daily study report from SEO Ustaad:\n- Current Lesson: ${activeWeekTitle}\n- Stay Timer Count: ${studyDurationMinutes} minutes\n- Checklist Items Completed: ${checklistCount}\n- Cloud Database: Cloud SQL (asia-southeast1) + Firebase Firestore synchronized\n\nKeep practicing daily to master Technical SEO and Client Delivery!\n\nBest Regards,\nSEO Ustaad LMS (ایس ای او استاد)`;
          await sendGmailSummary(user.email!, subject, body);
          showNotification('success', `Progress report email successfully sent to ${user.email}!`);
        } catch (err: any) {
          showNotification('error', `Failed to send email: ${err.message}`);
        } finally {
          setLoading(false);
        }
      },
    });
  };

  const handleCreateTask = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTaskTitle.trim()) return;

    setConfirmModal({
      isOpen: true,
      title: 'Add Task to Google Tasks?',
      description: `This will create a new task "${newTaskTitle}" in your primary Google Tasks list with permission from your account.`,
      actionLabel: 'Add Task',
      onConfirm: async () => {
        setLoading(true);
        try {
          await createGoogleTask('@default', newTaskTitle.trim());
          setNewTaskTitle('');
          showNotification('success', 'Task added to Google Tasks!');
          await loadTasks();
        } catch (err: any) {
          showNotification('error', `Failed to add task: ${err.message}`);
        } finally {
          setLoading(false);
        }
      },
    });
  };

  const handleSyncAllChecklistToTasks = () => {
    setConfirmModal({
      isOpen: true,
      title: 'Sync SEO Checklist to Google Tasks?',
      description: `This will add 4 core daily study tasks for "${activeWeekTitle}" into your Google Tasks list so you can track them on your mobile device.`,
      actionLabel: 'Sync Tasks',
      onConfirm: async () => {
        setLoading(true);
        try {
          const defaultTasks = [
            `SEO Ustaad: Review ${activeWeekTitle} lecture notes`,
            `SEO Ustaad: Complete daily interactive practice demo sandbox`,
            `SEO Ustaad: Run technical audit check on robots.txt and schema`,
            `SEO Ustaad: Submit practical assignment to AI evaluator`,
          ];
          for (const title of defaultTasks) {
            await createGoogleTask('@default', title);
          }
          showNotification('success', 'All daily tasks synced to Google Tasks!');
          await loadTasks();
        } catch (err: any) {
          showNotification('error', `Failed to sync tasks: ${err.message}`);
        } finally {
          setLoading(false);
        }
      },
    });
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Header Banner */}
      <div className="bg-[#18181B] border border-white/10 rounded-2xl p-6 mb-8 shadow-xl">
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="px-2.5 py-0.5 rounded-full text-[11px] font-semibold bg-blue-500/10 text-blue-400 border border-blue-500/20">
                Connected Workspace
              </span>
              <span className="px-2.5 py-0.5 rounded-full text-[11px] font-semibold bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 flex items-center gap-1">
                <Database className="w-3 h-3" /> Cloud SQL (asia-southeast1)
              </span>
              <span className="px-2.5 py-0.5 rounded-full text-[11px] font-semibold bg-amber-500/10 text-amber-400 border border-amber-500/20 flex items-center gap-1">
                <Cloud className="w-3 h-3" /> Firestore Active
              </span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
              Google Workspace & Cloud Hub
            </h1>
            <p className="text-white/60 text-sm mt-1 max-w-2xl font-urdu-title">
              گوگل ڈرائیو، شیٹس، ڈوکس، جی میل، ٹاسکس اور کلاس روم کی براہِ راست انٹیگریشن برائے ایس ای او پریکٹس
            </p>
          </div>

          {/* Auth State Control */}
          <div>
            {user ? (
              <div className="flex items-center gap-4 bg-white/5 border border-white/10 p-2.5 rounded-xl">
                {user.photoURL ? (
                  <img
                    src={user.photoURL}
                    alt={user.displayName || 'Student'}
                    referrerPolicy="no-referrer"
                    className="w-10 h-10 rounded-full border border-white/20"
                  />
                ) : (
                  <div className="w-10 h-10 rounded-full bg-blue-600 flex items-center justify-center font-bold text-white text-sm">
                    {user.email?.[0].toUpperCase() || 'S'}
                  </div>
                )}
                <div>
                  <div className="flex items-center gap-2">
                    <p className="text-xs font-semibold text-white">
                      {user.displayName || studentName}
                    </p>
                    <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
                  </div>
                  <p className="text-[11px] text-white/50">{user.email}</p>
                </div>
                <button
                  id="workspace-sign-out-btn"
                  onClick={onSignOut}
                  className="px-3 py-1.5 text-xs text-white/70 hover:text-white bg-white/10 hover:bg-white/20 rounded-lg transition"
                >
                  Sign Out
                </button>
              </div>
            ) : (
              <button
                id="workspace-sign-in-btn"
                onClick={onSignIn}
                className="gsi-material-button"
                style={{
                  backgroundColor: '#ffffff',
                  border: '1px solid #747775',
                  borderRadius: '8px',
                  boxSizing: 'border-box',
                  color: '#1f1f1f',
                  cursor: 'pointer',
                  fontFamily: 'Roboto, arial, sans-serif',
                  fontSize: '14px',
                  height: '40px',
                  letterSpacing: '0.25px',
                  outline: 'none',
                  overflow: 'hidden',
                  padding: '0 16px',
                  position: 'relative',
                  textAlign: 'center',
                  verticalAlign: 'middle',
                  whiteSpace: 'nowrap',
                  width: 'auto',
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '10px',
                  fontWeight: 500,
                }}
              >
                <svg version="1.1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48" style={{ width: '20px', height: '20px' }}>
                  <path fill="#EA4335" d="M24 9.5c3.54 0 6.71 1.22 9.21 3.6l6.85-6.85C35.9 2.38 30.47 0 24 0 14.62 0 6.51 5.38 2.56 13.22l7.98 6.19C12.43 13.72 17.74 9.5 24 9.5z" />
                  <path fill="#4285F4" d="M46.98 24.55c0-1.57-.15-3.09-.38-4.55H24v9.02h12.94c-.58 2.96-2.26 5.48-4.78 7.18l7.73 6c4.51-4.18 7.09-10.36 7.09-17.65z" />
                  <path fill="#FBBC05" d="M10.53 28.59c-.48-1.45-.76-2.99-.76-4.59s.27-3.14.76-4.59l-7.98-6.19C.92 16.46 0 20.12 0 24c0 3.88.92 7.54 2.56 10.78l7.97-6.19z" />
                  <path fill="#34A853" d="M24 48c6.48 0 11.93-2.13 15.89-5.81l-7.73-6c-2.15 1.45-4.92 2.3-8.16 2.3-6.26 0-11.57-4.22-13.47-9.91l-7.98 6.19C6.51 42.62 14.62 48 24 48z" />
                </svg>
                <span>Sign in with Google</span>
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Notification Toast */}
      {statusMessage && (
        <div
          className={`mb-6 p-4 rounded-xl border flex items-center gap-3 transition-all ${
            statusMessage.type === 'success'
              ? 'bg-emerald-950/40 border-emerald-500/30 text-emerald-200'
              : 'bg-rose-950/40 border-rose-500/30 text-rose-200'
          }`}
        >
          {statusMessage.type === 'success' ? (
            <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0" />
          ) : (
            <AlertTriangle className="w-5 h-5 text-rose-400 shrink-0" />
          )}
          <span className="text-sm font-medium">{statusMessage.text}</span>
        </div>
      )}

      {/* Workspace App Switcher Navigation */}
      <div className="flex flex-wrap items-center gap-2 mb-6 border-b border-white/10 pb-4">
        <button
          id="tab-btn-drive"
          onClick={() => setActiveSubTab('drive')}
          className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-semibold transition ${
            activeSubTab === 'drive'
              ? 'bg-blue-600 text-white shadow-md shadow-blue-500/20'
              : 'bg-white/5 text-white/60 hover:text-white hover:bg-white/10'
          }`}
        >
          <FolderGit2 className="w-4 h-4 text-blue-400" />
          <span>Google Drive</span>
        </button>

        <button
          id="tab-btn-sheets"
          onClick={() => setActiveSubTab('sheets')}
          className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-semibold transition ${
            activeSubTab === 'sheets'
              ? 'bg-emerald-600 text-white shadow-md shadow-emerald-500/20'
              : 'bg-white/5 text-white/60 hover:text-white hover:bg-white/10'
          }`}
        >
          <FileSpreadsheet className="w-4 h-4 text-emerald-400" />
          <span>Google Sheets</span>
        </button>

        <button
          id="tab-btn-docs"
          onClick={() => setActiveSubTab('docs')}
          className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-semibold transition ${
            activeSubTab === 'docs'
              ? 'bg-indigo-600 text-white shadow-md shadow-indigo-500/20'
              : 'bg-white/5 text-white/60 hover:text-white hover:bg-white/10'
          }`}
        >
          <FileText className="w-4 h-4 text-indigo-400" />
          <span>Google Docs</span>
        </button>

        <button
          id="tab-btn-gmail"
          onClick={() => setActiveSubTab('gmail')}
          className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-semibold transition ${
            activeSubTab === 'gmail'
              ? 'bg-rose-600 text-white shadow-md shadow-rose-500/20'
              : 'bg-white/5 text-white/60 hover:text-white hover:bg-white/10'
          }`}
        >
          <Mail className="w-4 h-4 text-rose-400" />
          <span>Gmail</span>
        </button>

        <button
          id="tab-btn-tasks"
          onClick={() => setActiveSubTab('tasks')}
          className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-semibold transition ${
            activeSubTab === 'tasks'
              ? 'bg-amber-600 text-white shadow-md shadow-amber-500/20'
              : 'bg-white/5 text-white/60 hover:text-white hover:bg-white/10'
          }`}
        >
          <CheckSquare className="w-4 h-4 text-amber-400" />
          <span>Google Tasks</span>
        </button>

        <button
          id="tab-btn-classroom"
          onClick={() => setActiveSubTab('classroom')}
          className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-semibold transition ${
            activeSubTab === 'classroom'
              ? 'bg-teal-600 text-white shadow-md shadow-teal-500/20'
              : 'bg-white/5 text-white/60 hover:text-white hover:bg-white/10'
          }`}
        >
          <GraduationCap className="w-4 h-4 text-teal-400" />
          <span>Google Classroom</span>
        </button>
      </div>

      {/* Main Tab Panels */}
      {!user ? (
        <div className="bg-[#18181B] border border-white/10 rounded-2xl p-12 text-center">
          <Sparkles className="w-12 h-12 text-blue-400 mx-auto mb-4" />
          <h2 className="text-xl font-bold text-white mb-2">Connect Your Google Account</h2>
          <p className="text-white/60 text-sm max-w-md mx-auto mb-6">
            Sign in with Google to enable real-time synchronization with Google Drive, Sheets, Docs, Gmail, Tasks, and Classroom.
          </p>
          <button
            onClick={onSignIn}
            className="px-6 py-2.5 bg-blue-600 hover:bg-blue-500 text-white text-sm font-semibold rounded-xl shadow-lg shadow-blue-500/20 transition inline-flex items-center gap-2"
          >
            Sign In with Google
          </button>
        </div>
      ) : (
        <div className="space-y-6">
          {/* 1. DRIVE TAB */}
          {activeSubTab === 'drive' && (
            <div className="space-y-6">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-[#18181B] p-4 rounded-xl border border-white/10">
                <div className="flex items-center gap-3">
                  <button
                    id="create-drive-audit-btn"
                    onClick={handleCreateDriveAudit}
                    disabled={loading}
                    className="flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-500 text-white text-xs font-semibold rounded-lg shadow transition"
                  >
                    <Upload className="w-3.5 h-3.5" />
                    <span>Upload SEO Audit to Drive</span>
                  </button>
                  <button
                    onClick={loadDriveFiles}
                    disabled={loading}
                    className="p-2 bg-white/5 hover:bg-white/10 text-white/70 hover:text-white rounded-lg transition"
                    title="Refresh files"
                  >
                    <RefreshCw className={`w-4 h-4 ${loading ? 'animate-spin' : ''}`} />
                  </button>
                </div>

                <div className="relative">
                  <Search className="w-3.5 h-3.5 text-white/40 absolute left-3 top-3" />
                  <input
                    type="text"
                    placeholder="Search files in Drive..."
                    value={driveSearch}
                    onChange={(e) => setDriveSearch(e.target.value)}
                    className="pl-9 pr-3 py-1.5 text-xs bg-white/5 border border-white/10 rounded-lg text-white placeholder-white/40 focus:outline-none focus:border-blue-500 w-full sm:w-64"
                  />
                </div>
              </div>

              {/* Files Grid */}
              <div className="bg-[#18181B] border border-white/10 rounded-xl p-4">
                <h3 className="text-sm font-semibold text-white mb-3">Your Google Drive Files</h3>
                {driveFiles.length === 0 ? (
                  <p className="text-xs text-white/40 py-6 text-center">
                    {loading ? 'Loading files from Drive...' : 'No files found or file permissions pending.'}
                  </p>
                ) : (
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                    {driveFiles
                      .filter((f) => f.name.toLowerCase().includes(driveSearch.toLowerCase()))
                      .map((file) => (
                        <div
                          key={file.id}
                          className="bg-white/5 border border-white/10 rounded-lg p-3 hover:bg-white/10 transition flex items-start justify-between gap-2"
                        >
                          <div className="overflow-hidden">
                            <p className="text-xs font-medium text-white truncate" title={file.name}>
                              {file.name}
                            </p>
                            <p className="text-[10px] text-white/40 mt-0.5">
                              {file.modifiedTime ? new Date(file.modifiedTime).toLocaleDateString() : 'Drive Item'}
                            </p>
                          </div>
                          {file.webViewLink && (
                            <a
                              href={file.webViewLink}
                              target="_blank"
                              rel="noreferrer"
                              className="p-1.5 text-white/50 hover:text-blue-400 rounded transition"
                              title="Open in Google Drive"
                            >
                              <ExternalLink className="w-3.5 h-3.5" />
                            </a>
                          )}
                        </div>
                      ))}
                  </div>
                )}
              </div>
            </div>
          )}

          {/* 2. SHEETS TAB */}
          {activeSubTab === 'sheets' && (
            <div className="space-y-6">
              <div className="bg-[#18181B] border border-white/10 rounded-xl p-6">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-4">
                  <div>
                    <h3 className="text-base font-bold text-white">SEO Spreadsheet Generator</h3>
                    <p className="text-xs text-white/60 font-urdu-title mt-0.5">
                      گوگل شیٹس میں خودکار کی ورڈ ریسرچ اور کلائنٹ آڈٹ میٹرکس بنائیں
                    </p>
                  </div>
                  <button
                    id="create-seo-sheet-btn"
                    onClick={handleCreateSheet}
                    disabled={loading}
                    className="px-4 py-2 bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-semibold rounded-lg shadow-md shadow-emerald-500/20 flex items-center gap-2 transition"
                  >
                    <Plus className="w-4 h-4" />
                    <span>Create Keyword Matrix Spreadsheet</span>
                  </button>

                  <button
                    id="sync-progress-sheets-btn"
                    onClick={handleSyncProgressReportToSheets}
                    disabled={loading}
                    className="px-4 py-2 bg-blue-600 hover:bg-blue-500 text-white text-xs font-semibold rounded-lg shadow-md shadow-blue-500/20 flex items-center gap-2 transition"
                  >
                    <RefreshCw className={`w-4 h-4 ${loading ? 'animate-spin' : ''}`} />
                    <span>Sync Progress Report to Sheets</span>
                  </button>
                </div>

                <div className="mt-6 border-t border-white/10 pt-4">
                  <h4 className="text-xs font-semibold text-white/80 uppercase tracking-wider mb-3">
                    Created Spreadsheets in This Session
                  </h4>
                  {createdSheets.length === 0 ? (
                    <p className="text-xs text-white/40">
                      Click the button above to generate a new live spreadsheet directly in Google Sheets.
                    </p>
                  ) : (
                    <div className="space-y-2">
                      {createdSheets.map((sheet, i) => (
                        <div key={i} className="flex items-center justify-between bg-white/5 p-3 rounded-lg border border-white/10">
                          <span className="text-xs font-medium text-white">{sheet.title}</span>
                          <a
                            href={sheet.url}
                            target="_blank"
                            rel="noreferrer"
                            className="flex items-center gap-1 text-xs text-emerald-400 hover:text-emerald-300 font-semibold"
                          >
                            <span>Open in Sheets</span>
                            <ExternalLink className="w-3.5 h-3.5" />
                          </a>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            </div>
          )}

          {/* 3. DOCS TAB */}
          {activeSubTab === 'docs' && (
            <div className="space-y-6">
              <div className="bg-[#18181B] border border-white/10 rounded-xl p-6">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-4">
                  <div>
                    <h3 className="text-base font-bold text-white">Google Docs Lesson & Proposal Exporter</h3>
                    <p className="text-xs text-white/60 font-urdu-title mt-0.5">
                      لیکچر نوٹس اور کلائنٹ پروپوزل گوگل ڈاکس میں برآمد کریں
                    </p>
                  </div>
                  <button
                    id="create-seo-doc-btn"
                    onClick={handleCreateDoc}
                    disabled={loading}
                    className="px-4 py-2 bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-semibold rounded-lg shadow-md shadow-indigo-500/20 flex items-center gap-2 transition"
                  >
                    <Plus className="w-4 h-4" />
                    <span>Export "{activeWeekTitle}" to Docs</span>
                  </button>
                </div>

                <div className="mt-6 border-t border-white/10 pt-4">
                  <h4 className="text-xs font-semibold text-white/80 uppercase tracking-wider mb-3">
                    Created Google Docs
                  </h4>
                  {createdDocs.length === 0 ? (
                    <p className="text-xs text-white/40">
                      No documents created yet. Export your lesson notes to view them in Google Docs.
                    </p>
                  ) : (
                    <div className="space-y-2">
                      {createdDocs.map((docItem, i) => (
                        <div key={i} className="flex items-center justify-between bg-white/5 p-3 rounded-lg border border-white/10">
                          <span className="text-xs font-medium text-white">{docItem.title}</span>
                          <a
                            href={docItem.url}
                            target="_blank"
                            rel="noreferrer"
                            className="flex items-center gap-1 text-xs text-indigo-400 hover:text-indigo-300 font-semibold"
                          >
                            <span>Open in Google Docs</span>
                            <ExternalLink className="w-3.5 h-3.5" />
                          </a>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            </div>
          )}

          {/* 4. GMAIL TAB */}
          {activeSubTab === 'gmail' && (
            <div className="space-y-6">
              <div className="bg-[#18181B] border border-white/10 rounded-xl p-6">
                <h3 className="text-base font-bold text-white mb-1">Gmail Progress Dispatcher</h3>
                <p className="text-xs text-white/60 font-urdu-title mb-6">
                  روزانہ مطالعے کی کارکردگی اور اسائنمنٹ فیڈ بیک اپنے ای میل پر ارسال کریں
                </p>

                <div className="bg-white/5 p-4 rounded-xl border border-white/10 space-y-3 mb-6">
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-white/60">Recipient:</span>
                    <span className="text-white font-medium">{user.email}</span>
                  </div>
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-white/60">Subject:</span>
                    <span className="text-white font-medium">
                      SEO Ustaad Progress Summary - {new Date().toLocaleDateString()}
                    </span>
                  </div>
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-white/60">Today's Study Stay Timer:</span>
                    <span className="text-emerald-400 font-semibold">{studyDurationMinutes} Minutes</span>
                  </div>
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-white/60">Checklist Completed:</span>
                    <span className="text-blue-400 font-semibold">{checklistCount} Items</span>
                  </div>
                </div>

                <button
                  id="send-gmail-summary-btn"
                  onClick={handleSendGmailSummary}
                  disabled={loading}
                  className="px-5 py-2.5 bg-rose-600 hover:bg-rose-500 text-white text-xs font-semibold rounded-lg shadow-md shadow-rose-500/20 flex items-center gap-2 transition"
                >
                  <Send className="w-3.5 h-3.5" />
                  <span>Send Summary to My Gmail</span>
                </button>
              </div>
            </div>
          )}

          {/* 5. TASKS TAB */}
          {activeSubTab === 'tasks' && (
            <div className="space-y-6">
              <div className="bg-[#18181B] border border-white/10 rounded-xl p-6">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
                  <div>
                    <h3 className="text-base font-bold text-white">Google Tasks Synchronization</h3>
                    <p className="text-xs text-white/60 font-urdu-title mt-0.5">
                      ایس ای او روٹین ٹاسکس اپنے ذاتی گوگل ٹاسکس کے ساتھ ہم آہنگ کریں
                    </p>
                  </div>
                  <button
                    id="sync-all-tasks-btn"
                    onClick={handleSyncAllChecklistToTasks}
                    disabled={loading}
                    className="px-4 py-2 bg-amber-600 hover:bg-amber-500 text-white text-xs font-semibold rounded-lg shadow-md shadow-amber-500/20 flex items-center gap-2 transition"
                  >
                    <CheckSquare className="w-4 h-4" />
                    <span>Sync 4 Lesson Tasks to Google Tasks</span>
                  </button>
                </div>

                {/* Add Custom Task Form */}
                <form onSubmit={handleCreateTask} className="flex gap-2 mb-6">
                  <input
                    type="text"
                    placeholder="Add a new custom task to Google Tasks..."
                    value={newTaskTitle}
                    onChange={(e) => setNewTaskTitle(e.target.value)}
                    className="flex-1 px-3 py-2 text-xs bg-white/5 border border-white/10 rounded-lg text-white placeholder-white/40 focus:outline-none focus:border-amber-500"
                  />
                  <button
                    type="submit"
                    disabled={loading || !newTaskTitle.trim()}
                    className="px-4 py-2 bg-white/10 hover:bg-white/20 text-white text-xs font-semibold rounded-lg transition"
                  >
                    Add Task
                  </button>
                </form>

                {/* Active Tasks List */}
                <div className="border-t border-white/10 pt-4">
                  <div className="flex items-center justify-between mb-3">
                    <h4 className="text-xs font-semibold text-white/80 uppercase tracking-wider">
                      Tasks in Google Tasks
                    </h4>
                    <button
                      onClick={loadTasks}
                      disabled={loading}
                      className="text-xs text-white/40 hover:text-white flex items-center gap-1"
                    >
                      <RefreshCw className={`w-3 h-3 ${loading ? 'animate-spin' : ''}`} />
                      <span>Refresh</span>
                    </button>
                  </div>

                  {tasks.length === 0 ? (
                    <p className="text-xs text-white/40 py-4 text-center">
                      {loading ? 'Loading tasks...' : 'No active tasks found in your Google Tasks account.'}
                    </p>
                  ) : (
                    <div className="space-y-2">
                      {tasks.map((task) => (
                        <div
                          key={task.id}
                          className="flex items-center justify-between p-3 bg-white/5 rounded-lg border border-white/10"
                        >
                          <div className="flex items-center gap-2">
                            <span
                              className={`w-2 h-2 rounded-full ${
                                task.status === 'completed' ? 'bg-emerald-400' : 'bg-amber-400'
                              }`}
                            ></span>
                            <span
                              className={`text-xs ${
                                task.status === 'completed' ? 'line-through text-white/40' : 'text-white'
                              }`}
                            >
                              {task.title}
                            </span>
                          </div>
                          <span className="text-[10px] text-white/40 uppercase font-mono">{task.status}</span>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            </div>
          )}

          {/* 6. CLASSROOM TAB */}
          {activeSubTab === 'classroom' && (
            <div className="space-y-6">
              <div className="bg-[#18181B] border border-white/10 rounded-xl p-6">
                <h3 className="text-base font-bold text-white mb-1">Google Classroom Integration</h3>
                <p className="text-xs text-white/60 font-urdu-title mb-6">
                  گوگل کلاس روم کورسز اور اسائنمنٹس دیکھیں
                </p>

                {courses.length === 0 ? (
                  <div className="text-center py-8 bg-white/5 rounded-xl border border-white/10">
                    <GraduationCap className="w-8 h-8 text-teal-400 mx-auto mb-2 opacity-60" />
                    <p className="text-xs text-white/60">
                      {loading
                        ? 'Fetching your Google Classroom courses...'
                        : 'No active Google Classroom courses found for this account.'}
                    </p>
                    <button
                      onClick={loadClassroom}
                      disabled={loading}
                      className="mt-3 px-3 py-1 text-xs bg-white/10 hover:bg-white/20 text-white rounded-lg transition"
                    >
                      Check Again
                    </button>
                  </div>
                ) : (
                  <div className="space-y-4">
                    <div className="flex items-center gap-3">
                      <label className="text-xs text-white/60">Select Course:</label>
                      <select
                        value={selectedCourseId}
                        onChange={async (e) => {
                          const cid = e.target.value;
                          setSelectedCourseId(cid);
                          const work = await listClassroomCourseWork(cid);
                          setCourseWork(work);
                        }}
                        className="text-xs bg-white/10 border border-white/20 text-white rounded-lg px-3 py-1.5 focus:outline-none"
                      >
                        {courses.map((c) => (
                          <option key={c.id} value={c.id} className="bg-[#18181B] text-white">
                            {c.name} {c.section ? `(${c.section})` : ''}
                          </option>
                        ))}
                      </select>
                    </div>

                    <div className="border-t border-white/10 pt-4">
                      <h4 className="text-xs font-semibold text-white/80 uppercase tracking-wider mb-3">
                        Coursework & Assignments
                      </h4>
                      {courseWork.length === 0 ? (
                        <p className="text-xs text-white/40">No coursework items found for this course.</p>
                      ) : (
                        <div className="space-y-2">
                          {courseWork.map((cw) => (
                            <div
                              key={cw.id}
                              className="p-3 bg-white/5 rounded-lg border border-white/10 flex items-center justify-between"
                            >
                              <div>
                                <p className="text-xs font-medium text-white">{cw.title}</p>
                                {cw.description && (
                                  <p className="text-[11px] text-white/40 line-clamp-1">{cw.description}</p>
                                )}
                              </div>
                              {cw.alternateLink && (
                                <a
                                  href={cw.alternateLink}
                                  target="_blank"
                                  rel="noreferrer"
                                  className="text-teal-400 hover:text-teal-300 p-1"
                                >
                                  <ExternalLink className="w-3.5 h-3.5" />
                                </a>
                              )}
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      )}

      {/* Confirmation Modal for Mutating & Destructive Workspace Actions */}
      {confirmModal.isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4">
          <div className="bg-[#18181B] border border-white/20 rounded-2xl max-w-md w-full p-6 shadow-2xl animate-in fade-in zoom-in duration-150">
            <div className="flex items-center gap-3 mb-4">
              <div
                className={`p-2 rounded-xl ${
                  confirmModal.isDestructive ? 'bg-rose-500/20 text-rose-400' : 'bg-blue-500/20 text-blue-400'
                }`}
              >
                {confirmModal.isDestructive ? <Trash2 className="w-5 h-5" /> : <AlertTriangle className="w-5 h-5" />}
              </div>
              <h3 className="text-base font-bold text-white">{confirmModal.title}</h3>
            </div>

            <p className="text-xs text-white/70 leading-relaxed mb-6">{confirmModal.description}</p>

            <div className="flex items-center justify-end gap-3">
              <button
                type="button"
                onClick={() => setConfirmModal((prev) => ({ ...prev, isOpen: false }))}
                className="px-4 py-2 text-xs font-semibold text-white/70 hover:text-white bg-white/5 hover:bg-white/10 rounded-xl border border-white/10 transition"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={async () => {
                  const onConfirm = confirmModal.onConfirm;
                  setConfirmModal((prev) => ({ ...prev, isOpen: false }));
                  await onConfirm();
                }}
                className={`px-4 py-2 text-xs font-semibold text-white rounded-xl shadow transition ${
                  confirmModal.isDestructive
                    ? 'bg-rose-600 hover:bg-rose-500'
                    : 'bg-blue-600 hover:bg-blue-500'
                }`}
              >
                {confirmModal.actionLabel}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
