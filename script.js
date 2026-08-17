/**
 * Emotion Explorer - Main JavaScript Module
 * 
 * Clean, accessible, vanilla JavaScript architecture designed for
 * seamless Plutchik emotion identification, scoring model calculations,
 * dynamic intensity assessments, and multi-tier visualization.
 */

(function () {
  'use strict';

  // =========================================================================
  // 1. DATA: Plutchik's Wheel of Emotions Taxonomy & Shared Color Palette
  // =========================================================================

  /**
   * Single Source of Truth for Emotion Color Families across large wheel & mini wheels.
   * Medium intensity = exact base emotion color from the large Plutchik wheel.
   * Low intensity = lighter / softer pastel variation.
   * High intensity = deeper / richer variation of the same color family.
   */
  const EMOTION_COLOR_PALETTE = {
    joy: {
      low: '#fff3c4',       // Light Serenity golden cream
      medium: '#ffd54f',    // Base Joy color (exact large wheel match)
      high: '#ffb300',      // Deep Ecstasy rich gold
      accent: '#d97706',    // High-contrast emphasis accent
      bgSubtle: '#fffde7'
    },
    trust: {
      low: '#c8e6c9',       // Light Acceptance soft mint
      medium: '#81c784',    // Base Trust color (exact large wheel match)
      high: '#388e3c',      // Deep Admiration rich green
      accent: '#2e7d32',    // High-contrast emphasis accent
      bgSubtle: '#f1f8e9'
    },
    fear: {
      low: '#b2dfdb',       // Light Apprehension pale teal
      medium: '#4db6ac',    // Base Fear color (exact large wheel match)
      high: '#00796b',      // Deep Terror rich teal
      accent: '#004d40',    // High-contrast emphasis accent
      bgSubtle: '#e0f2f1'
    },
    surprise: {
      low: '#bbdefb',       // Light Distraction soft sky blue
      medium: '#64b5f6',    // Base Surprise color (exact large wheel match)
      high: '#1976d2',      // Deep Amazement rich azure
      accent: '#1565c0',    // High-contrast emphasis accent
      bgSubtle: '#e3f2fd'
    },
    sadness: {
      low: '#d1c4e9',       // Light Pensiveness soft lavender
      medium: '#9575cd',    // Base Sadness color (exact large wheel match)
      high: '#5e35b1',      // Deep Grief rich purple-indigo
      accent: '#4527a0',    // High-contrast emphasis accent
      bgSubtle: '#ede7f6'
    },
    disgust: {
      low: '#e1bee7',       // Light Boredom soft orchid
      medium: '#ba68c8',    // Base Disgust color (exact large wheel match)
      high: '#7b1fa2',      // Deep Loathing rich magenta-plum
      accent: '#6a1b9a',    // High-contrast emphasis accent
      bgSubtle: '#f3e5f5'
    },
    anger: {
      low: '#ffcdd2',       // Light Annoyance pale coral blush
      medium: '#e57373',    // Base Anger color (exact large wheel match)
      high: '#d32f2f',      // Deep Rage rich crimson
      accent: '#c62828',    // High-contrast emphasis accent
      bgSubtle: '#ffebee'
    },
    anticipation: {
      low: '#ffe0b2',       // Light Interest soft peach
      medium: '#ffb74d',    // Base Anticipation color (exact large wheel match)
      high: '#f57c00',      // Deep Vigilance rich amber orange
      accent: '#e65100',    // High-contrast emphasis accent
      bgSubtle: '#fff3e0'
    }
  };

  /**
   * 8 Primary Emotions with 3 Intensity Tiers (Low, Medium, High).
   * Hidden from the UI during the assessment, revealed respectfully in results.
   */
  const PLUTCHIK_EMOTION_TAXONOMY = {
    joy: {
      key: 'joy',
      name: 'Joy',
      color: EMOTION_COLOR_PALETTE.joy.medium,
      palette: EMOTION_COLOR_PALETTE.joy,
      levels: {
        low: { label: 'Serenity', description: 'A quiet, gentle sense of calm contentment, peace, and ease within yourself.' },
        medium: { label: 'Joy', description: 'A bright, uplifting feeling of happiness, lightness, and heartwarming fulfillment.' },
        high: { label: 'Ecstasy', description: 'An intense, radiant wave of delight, elation, and deep celebration.' }
      },
      intensityQuestion: 'How strongly do you feel a sense of lightness, uplift, or positive energy right now?'
    },
    trust: {
      key: 'trust',
      name: 'Trust',
      color: EMOTION_COLOR_PALETTE.trust.medium,
      palette: EMOTION_COLOR_PALETTE.trust,
      levels: {
        low: { label: 'Acceptance', description: 'A peaceful willingness to receive things and people as they are without resistance.' },
        medium: { label: 'Trust', description: 'A steady feeling of safety, reassurance, and dependable confidence in yourself or others.' },
        high: { label: 'Admiration', description: 'A deep reverence, profound respect, and complete faith in safety and goodness.' }
      },
      intensityQuestion: 'How strongly do you feel safe, supported, or able to let your guard down right now?'
    },
    fear: {
      key: 'fear',
      name: 'Fear',
      color: EMOTION_COLOR_PALETTE.fear.medium,
      palette: EMOTION_COLOR_PALETTE.fear,
      levels: {
        low: { label: 'Apprehension', description: 'A mild, anticipatory uneasiness or quiet caution about potential unknowns.' },
        medium: { label: 'Fear', description: 'A clear alertness to potential risk, vulnerability, or uncertainty needing caution.' },
        high: { label: 'Terror', description: 'An acute, overwhelming survival alert signaling an urgent need for safety and grounding.' }
      },
      intensityQuestion: 'How strongly do you feel the need to protect yourself, get away, or stay on alert right now?'
    },
    surprise: {
      key: 'surprise',
      name: 'Surprise',
      color: EMOTION_COLOR_PALETTE.surprise.medium,
      palette: EMOTION_COLOR_PALETTE.surprise,
      levels: {
        low: { label: 'Distraction', description: 'A slight, fleeting shift in attention caused by unexpected change in your environment.' },
        medium: { label: 'Surprise', description: 'A sudden, sharp awakening to something unexpected, spontaneous, or unforeseen.' },
        high: { label: 'Amazement', description: 'A breathtaking, disorienting wonder or awe at something sudden and extraordinary.' }
      },
      intensityQuestion: 'How strongly are you reacting to something unexpected, sudden, or unforeseen?'
    },
    sadness: {
      key: 'sadness',
      name: 'Sadness',
      color: EMOTION_COLOR_PALETTE.sadness.medium,
      palette: EMOTION_COLOR_PALETTE.sadness,
      levels: {
        low: { label: 'Pensiveness', description: 'A quiet, tender undertone of sorrow, reflective nostalgia, or inward quietude.' },
        medium: { label: 'Sadness', description: 'A recognizable ache of loss, disappointment, or heavy heart asking for gentleness.' },
        high: { label: 'Grief', description: 'A profound, immersive sorrow honoring a deep loss, detachment, or disconnection.' }
      },
      intensityQuestion: 'How strongly do you feel a sense of heaviness, loss, or inward tenderness right now?'
    },
    disgust: {
      key: 'disgust',
      name: 'Disgust',
      color: EMOTION_COLOR_PALETTE.disgust.medium,
      palette: EMOTION_COLOR_PALETTE.disgust,
      levels: {
        low: { label: 'Boredom', description: 'A mild disinterest, weariness, or slight aversion to what is currently present.' },
        medium: { label: 'Disgust', description: 'A clear urge to reject, step back from, or turn away from something unpleasant.' },
        high: { label: 'Loathing', description: 'An intense, visceral repulsion or intolerance toward an experience or boundary breach.' }
      },
      intensityQuestion: 'How strongly do you feel an urge to reject, push away, or separate yourself from something unpleasant?'
    },
    anger: {
      key: 'anger',
      name: 'Anger',
      color: EMOTION_COLOR_PALETTE.anger.medium,
      palette: EMOTION_COLOR_PALETTE.anger,
      levels: {
        low: { label: 'Annoyance', description: 'A mild friction, irritation, or restlessness when things feel slightly off-track.' },
        medium: { label: 'Anger', description: 'A clear spark of frustration, feeling blocked, or sensing a crossed boundary.' },
        high: { label: 'Rage', description: 'A powerful, surging energy focused on confronting, protecting, or breaking an obstacle.' }
      },
      intensityQuestion: 'How strongly do you feel a surge of frustration, friction, or urge to push back right now?'
    },
    anticipation: {
      key: 'anticipation',
      name: 'Anticipation',
      color: EMOTION_COLOR_PALETTE.anticipation.medium,
      palette: EMOTION_COLOR_PALETTE.anticipation,
      levels: {
        low: { label: 'Interest', description: 'A gentle curiosity, engagement, or leaning forward toward what comes next.' },
        medium: { label: 'Anticipation', description: 'A focused, energetic readiness looking ahead toward an approaching moment.' },
        high: { label: 'Vigilance', description: 'A heightened, intensely watchful state tracking upcoming developments closely.' }
      },
      intensityQuestion: 'How strongly is your attention pulled forward into what is about to happen next?'
    }
  };

  // =========================================================================
  // 2. PRIMARY QUESTIONNAIRE DATA (Questions 1 - 7)
  // Multi-select with maxChoices = 2
  // =========================================================================

  const PRIMARY_QUESTIONS = [
    {
      id: 'q1',
      question: "Which of these feels closest to what you're reacting to right now?",
      instruction: "Choose up to 2 options",
      maxChoices: 2,
      answers: [
        { id: 'q1_joy', text: "Something feels good, uplifting, or rewarding", emotion: 'joy' },
        { id: 'q1_trust', text: "Someone or something feels safe, supportive, or dependable", emotion: 'trust' },
        { id: 'q1_fear', text: "Something feels threatening, unsafe, or risky", emotion: 'fear' },
        { id: 'q1_surprise', text: "Something unexpected happened or changed suddenly", emotion: 'surprise' },
        { id: 'q1_sadness', text: "Something important feels lost, missing, or disappointing", emotion: 'sadness' },
        { id: 'q1_disgust', text: "Something feels unpleasant, wrong, or hard to tolerate", emotion: 'disgust' },
        { id: 'q1_anger', text: "Something feels unfair, frustrating, or in my way", emotion: 'anger' },
        { id: 'q1_anticipation', text: "I'm focused on something that may happen next", emotion: 'anticipation' },
        { id: 'q1_unsure', text: "I'm not sure / It feels unclear", emotion: null }
      ]
    },
    {
      id: 'q2',
      question: "What physical sensations are most noticeable in your body?",
      instruction: "Choose up to 2 options",
      maxChoices: 2,
      answers: [
        { id: 'q2_warmth', text: "Warmth, relaxed muscles, or an easy lightness", emotion: 'joy' },
        { id: 'q2_ease', text: "Steady breathing and a sense of settling in", emotion: 'trust' },
        { id: 'q2_tension', text: "Rapid heartbeat, shallow breathing, or trembling", emotion: 'fear' },
        { id: 'q2_startle', text: "A sudden pause, jolt, or wide-eyed alertness", emotion: 'surprise' },
        { id: 'q2_heaviness', text: "Heaviness in the chest, low energy, or a lump in the throat", emotion: 'sadness' },
        { id: 'q2_nausea', text: "Queasiness, tightening in the stomach, or wrinkling nose", emotion: 'disgust' },
        { id: 'q2_heat', text: "Heat in the face, clenched jaw, or tense fists", emotion: 'anger' },
        { id: 'q2_buzz', text: "Restless energy, leaning forward, or internal momentum", emotion: 'anticipation' },
        { id: 'q2_unsure', text: "None of these / Hard to tell", emotion: null }
      ]
    },
    {
      id: 'q3',
      question: "What is your immediate natural urge or instinct?",
      instruction: "Choose up to 2 options",
      maxChoices: 2,
      answers: [
        { id: 'q3_share', text: "To share the moment, smile, or savor the experience", emotion: 'joy' },
        { id: 'q3_connect', text: "To lean on someone, connect, or open up", emotion: 'trust' },
        { id: 'q3_flee', text: "To protect myself, withdraw, or find safety", emotion: 'fear' },
        { id: 'q3_stop', text: "To freeze for a second and figure out what just happened", emotion: 'surprise' },
        { id: 'q3_retreat', text: "To be alone, rest, or cry quietly", emotion: 'sadness' },
        { id: 'q3_reject', text: "To push away, avoid, or get rid of the situation", emotion: 'disgust' },
        { id: 'q3_confront', text: "To push back, speak up, or confront the problem", emotion: 'anger' },
        { id: 'q3_prepare', text: "To plan, prepare, or stay on standby for what's coming", emotion: 'anticipation' },
        { id: 'q3_unsure', text: "I don't feel a clear urge right now", emotion: null }
      ]
    },
    {
      id: 'q4',
      question: "What kind of thoughts are repeating in your mind?",
      instruction: "Choose up to 2 options",
      maxChoices: 2,
      answers: [
        { id: 'q4_positive', text: "“This is wonderful, I am grateful for this.”", emotion: 'joy' },
        { id: 'q4_reassured', text: "“I can rely on this, things will be okay.”", emotion: 'trust' },
        { id: 'q4_danger', text: "“What if something goes wrong? I don't feel safe.”", emotion: 'fear' },
        { id: 'q4_curious', text: "“Wait, where did that come from? I wasn't expecting that.”", emotion: 'surprise' },
        { id: 'q4_loss', text: "“I miss how things were; this feels empty or tender.”", emotion: 'sadness' },
        { id: 'q4_aversion', text: "“I can't stand this, this goes against what I value.”", emotion: 'disgust' },
        { id: 'q4_unfair', text: "“This isn't fair, this shouldn't be happening.”", emotion: 'anger' },
        { id: 'q4_future', text: "“What will happen next? I need to be ready.”", emotion: 'anticipation' },
        { id: 'q4_unsure', text: "My mind feels quiet or unclear", emotion: null }
      ]
    },
    {
      id: 'q5',
      question: "How is your focus oriented in time?",
      instruction: "Choose up to 2 options",
      maxChoices: 2,
      answers: [
        { id: 'q5_present_peace', text: "Fully resting in the present moment with appreciation", emotion: 'joy' },
        { id: 'q5_present_bond', text: "Anchored in current connection and stability", emotion: 'trust' },
        { id: 'q5_threat_alert', text: "Hyper-vigilant about immediate risks right now", emotion: 'fear' },
        { id: 'q5_instant_shift', text: "Pulled sharply by a sudden twist of events", emotion: 'surprise' },
        { id: 'q5_past_reflection', text: "Reflecting backwards on what was lost or has passed", emotion: 'sadness' },
        { id: 'q5_boundary_check', text: "Focused on an ongoing source of distaste or conflict", emotion: 'disgust' },
        { id: 'q5_active_friction', text: "Locked onto an obstacle or friction in the current situation", emotion: 'anger' },
        { id: 'q5_future_horizon', text: "Gazing forward into the upcoming horizon", emotion: 'anticipation' },
        { id: 'q5_unsure', text: "No particular time orientation", emotion: null }
      ]
    },
    {
      id: 'q6',
      question: "Which boundary or relational dynamic feels most relevant?",
      instruction: "Choose up to 2 options",
      maxChoices: 2,
      answers: [
        { id: 'q6_celebration', text: "Celebrating mutual happiness or warmth", emotion: 'joy' },
        { id: 'q6_alliance', text: "Trusting someone's integrity and support", emotion: 'trust' },
        { id: 'q6_vulnerability', text: "Feeling exposed or seeking self-protection", emotion: 'fear' },
        { id: 'q6_disruption', text: "Navigating an abrupt shift or revelation", emotion: 'surprise' },
        { id: 'q6_letting_go', text: "Honoring a gap, farewell, or tender detachment", emotion: 'sadness' },
        { id: 'q6_distance', text: "Setting a firm boundary to maintain distance", emotion: 'disgust' },
        { id: 'q6_assertion', text: "Standing up for boundaries that were crossed", emotion: 'anger' },
        { id: 'q6_readiness', text: "Anticipating how others will respond next", emotion: 'anticipation' },
        { id: 'q6_unsure', text: "None of these dynamics apply", emotion: null }
      ]
    },
    {
      id: 'q7',
      question: "What would bring you the most relief or alignment right now?",
      instruction: "Choose up to 2 options",
      maxChoices: 2,
      answers: [
        { id: 'q7_continue', text: "Continuing to immerse in this pleasant state", emotion: 'joy' },
        { id: 'q7_deepen', text: "Resting in quiet reassurance and mutual trust", emotion: 'trust' },
        { id: 'q7_safety', text: "Reassurance, a safe environment, or grounding", emotion: 'fear' },
        { id: 'q7_clarity', text: "Time to process and understand what just happened", emotion: 'surprise' },
        { id: 'q7_comfort', text: "Gentle comfort, kindness, or permission to rest", emotion: 'sadness' },
        { id: 'q7_cleansing', text: "Cleansing the air or removing what feels toxic", emotion: 'disgust' },
        { id: 'q7_resolution', text: "Direct resolution, fairness, or acknowledgment", emotion: 'anger' },
        { id: 'q7_arrival', text: "Knowing how the situation will unfold", emotion: 'anticipation' },
        { id: 'q7_unsure', text: "I'm still exploring what I need", emotion: null }
      ]
    }
  ];

  // Standard Intensity Answers (Single selection)
  const INTENSITY_ANSWERS = [
    { id: 'intensity_low', text: 'A little', level: 'low' },
    { id: 'intensity_medium', text: 'Noticeably', level: 'medium' },
    { id: 'intensity_high', text: 'Very strongly', level: 'high' }
  ];

  // =========================================================================
  // 3. APPLICATION STATE
  // =========================================================================

  const state = {
    currentView: 'start', // 'start' | 'question' | 'result'
    currentQuestionIndex: 0,
    questionsList: [...PRIMARY_QUESTIONS], // Dynamically expanded with intensity questions
    selectedAnswers: {}, // { [questionId]: [answerId1, answerId2] }
    finalEmotions: [], // ['fear', 'sadness']
    identifiedEmotions: [], // [{ emotionKey, level, label, description }]
    isTransitioning: false,
    customScoringModel: null // Allows external overrides
  };

  // =========================================================================
  // 4. DOM ELEMENTS CACHE
  // =========================================================================

  const DOM = {
    // Views
    startView: document.getElementById('startView'),
    questionView: document.getElementById('questionView'),
    resultView: document.getElementById('resultView'),

    // Start View
    startBtn: document.getElementById('startBtn'),
    plutchikToggleBtn: document.getElementById('plutchikToggleBtn'),
    plutchikExpandedContent: document.getElementById('plutchikExpandedContent'),
    leaveCommentBtnStart: document.getElementById('leaveCommentBtnStart'),

    // Question View
    progressSection: document.getElementById('progressSection'),
    progressDotsTrack: document.getElementById('progressDotsTrack'),
    progressLabel: document.getElementById('progressLabel'),
    backNavContainer: document.getElementById('backNavContainer'),
    backBtn: document.getElementById('backBtn'),
    questionContainer: document.getElementById('questionContainer'),
    questionText: document.getElementById('questionText'),
    instructionText: document.getElementById('instructionText'),
    answersList: document.getElementById('answersList'),
    nextBtn: document.getElementById('nextBtn'),
    nextBtnText: document.getElementById('nextBtnText'),

    // Result View
    resultContainer: document.getElementById('resultContainer'),
    resultHeader: document.getElementById('resultHeader'),
    resultTitle: document.getElementById('resultTitle'),
    resultIntroText: document.getElementById('resultIntroText'),
    emotionResultsList: document.getElementById('emotionResultsList'),
    zeroResultCard: document.getElementById('zeroResultCard'),
    wheelSection: document.getElementById('wheelSection'),
    plutchikWheelSvg: document.getElementById('plutchikWheelSvg'),
    restartBtn: document.getElementById('restartBtn'),
    downloadSummaryBtn: document.getElementById('downloadSummaryBtn'),
    leaveCommentBtnResult: document.getElementById('leaveCommentBtnResult'),

    // Comment Modal Elements
    commentModal: document.getElementById('commentModal'),
    closeCommentModalBtn: document.getElementById('closeCommentModalBtn'),
    cancelCommentBtn: document.getElementById('cancelCommentBtn'),
    commentForm: document.getElementById('commentForm'),
    commentTextInput: document.getElementById('commentTextInput'),
    commentSuccessMsg: document.getElementById('commentSuccessMsg')
  };

  // =========================================================================
  // 5. VIEW NAVIGATION & TRANSITIONS
  // =========================================================================

  /**
   * Switch between major views ('start', 'question', 'result')
   */
  function switchView(viewName) {
    state.currentView = viewName;
    
    // Scroll window smoothly to top
    window.scrollTo({ top: 0, behavior: 'smooth' });

    [DOM.startView, DOM.questionView, DOM.resultView].forEach(v => {
      if (v) v.classList.remove('active');
    });

    if (viewName === 'start' && DOM.startView) {
      DOM.startView.classList.add('active');
    } else if (viewName === 'question' && DOM.questionView) {
      DOM.questionView.classList.add('active');
    } else if (viewName === 'result' && DOM.resultView) {
      DOM.resultView.classList.add('active');
    }
  }

  /**
   * Start or restart the questionnaire
   */
  function startQuestionnaire() {
    state.currentQuestionIndex = 0;
    state.selectedAnswers = {};
    state.finalEmotions = [];
    state.identifiedEmotions = [];
    state.questionsList = [...PRIMARY_QUESTIONS];
    
    renderCurrentQuestion(false);
    switchView('question');
  }

  // =========================================================================
  // 6. SCORING MODEL & FINAL EMOTIONS DETERMINATION
  // =========================================================================

  /**
   * Phase 1: Calculate raw frequency scores for all 8 Plutchik emotions
   * based on answers chosen in questions 1 through 7.
   * @returns {Object} { joy: number, trust: number, ... }
   */
  function calculateEmotionScores() {
    const scores = {
      joy: 0,
      trust: 0,
      fear: 0,
      surprise: 0,
      sadness: 0,
      disgust: 0,
      anger: 0,
      anticipation: 0
    };

    PRIMARY_QUESTIONS.forEach(q => {
      const selections = state.selectedAnswers[q.id] || [];
      selections.forEach(selectedId => {
        const ansObj = q.answers.find(a => a.id === selectedId);
        if (ansObj && ansObj.emotion && scores[ansObj.emotion] !== undefined) {
          scores[ansObj.emotion]++;
        }
      });
    });

    return scores;
  }

  /**
   * Determines the final emotions to be evaluated.
   * Logic:
   * 1. If all scores are 0, return [] (no fallback emotions).
   * 2. Find highest scoring emotions.
   * 3. If 2 or more emotions tie for highest score, all tied emotions move to intensity testing.
   * 4. If exactly 1 highest scoring emotion, check second highest:
   *    - If second highest score > 0, include all emotions tied at second highest.
   *    - If second highest score == 0, only include the highest scoring emotion.
   * @param {Object} scores - { joy: 3, fear: 5, ... }
   * @returns {Array<string>} list of emotion keys (e.g. ['fear', 'sadness'])
   */
  function determineFinalEmotions(scores) {
    const emotionKeys = Object.keys(scores);
    
    // Find highest score
    let highestScore = -1;
    let highestEmotions = [];

    emotionKeys.forEach(key => {
      const val = scores[key];
      if (val > highestScore) {
        highestScore = val;
        highestEmotions = [key];
      } else if (val === highestScore && highestScore > 0) {
        highestEmotions.push(key);
      }
    });

    // Zero-score check: if highest score is 0 or all answers were 'unsure'
    if (highestScore <= 0 || highestEmotions.length === 0) {
      return [];
    }

    // If multiple emotions tie for highest score:
    if (highestEmotions.length >= 2) {
      return highestEmotions;
    }

    // Exactly 1 highest scoring emotion:
    // Check second-highest score strictly less than highestScore
    let secondHighestScore = -1;
    let secondHighestEmotions = [];

    emotionKeys.forEach(key => {
      const val = scores[key];
      if (val < highestScore) {
        if (val > secondHighestScore) {
          secondHighestScore = val;
          secondHighestEmotions = [key];
        } else if (val === secondHighestScore && secondHighestScore > 0) {
          secondHighestEmotions.push(key);
        }
      }
    });

    // Only include second-highest emotions if their score is strictly > 0
    if (secondHighestScore > 0 && secondHighestEmotions.length > 0) {
      return [highestEmotions[0], ...secondHighestEmotions];
    }

    return highestEmotions;
  }

  /**
   * Builds dynamic hidden intensity questions for each final emotion.
   * Emotion names are never revealed in the question or options.
   * @param {Array<string>} emotions - e.g. ['fear', 'sadness']
   * @returns {Array<Object>} array of intensity question objects
   */
  function buildIntensityQuestions(emotions) {
    return emotions.map(emotionKey => {
      const emoData = PLUTCHIK_EMOTION_TAXONOMY[emotionKey];
      return {
        id: `intensity_${emotionKey}`,
        emotionKey: emotionKey,
        isIntensity: true,
        question: emoData.intensityQuestion,
        instruction: "Select one option",
        maxChoices: 1,
        answers: INTENSITY_ANSWERS.map(ia => ({
          id: `intensity_${emotionKey}_${ia.level}`,
          text: ia.text,
          level: ia.level
        }))
      };
    });
  }

  // =========================================================================
  // 7. QUESTION RENDERING & PROGRESS
  // =========================================================================

  /**
   * Updates the progress dots track
   */
  function updateProgress() {
    const total = state.questionsList.length;
    const current = state.currentQuestionIndex + 1;

    DOM.progressLabel.textContent = `Question ${current} of ${total}`;
    DOM.progressDotsTrack.setAttribute('aria-valuenow', current);
    DOM.progressDotsTrack.setAttribute('aria-valuemax', total);

    // Build the dot connector sequence: ● — ○ — ○ ...
    DOM.progressDotsTrack.innerHTML = '';

    for (let i = 0; i < total; i++) {
      const stepWrap = document.createElement('div');
      stepWrap.className = 'progress-step';

      const dot = document.createElement('div');
      dot.className = 'progress-dot';
      
      if (i === state.currentQuestionIndex) {
        dot.classList.add('active');
      } else if (i < state.currentQuestionIndex) {
        dot.classList.add('completed');
      }

      stepWrap.appendChild(dot);

      // Add connecting line between dots (except after the last dot)
      if (i < total - 1) {
        const connector = document.createElement('div');
        connector.className = 'progress-connector';
        if (i < state.currentQuestionIndex) {
          connector.classList.add('filled');
        }
        stepWrap.appendChild(connector);
      }

      DOM.progressDotsTrack.appendChild(stepWrap);
    }

    // Toggle Back button visibility (Visible from question index >= 1)
    if (state.currentQuestionIndex > 0) {
      DOM.backBtn.classList.add('visible');
    } else {
      DOM.backBtn.classList.remove('visible');
    }
  }

  /**
   * Renders the current question and answer options into the DOM
   */
  function renderCurrentQuestion(animate = true, direction = 'forward') {
    const qData = state.questionsList[state.currentQuestionIndex];
    if (!qData) return;

    const executeRender = () => {
      // 1. Update text content
      DOM.questionText.textContent = qData.question;
      DOM.instructionText.textContent = qData.instruction || (qData.maxChoices === 1 ? 'Select one option' : `Choose up to ${qData.maxChoices} options`);
      DOM.instructionText.classList.remove('limit-reached');

      // 2. Clear & rebuild answers list
      DOM.answersList.innerHTML = '';
      const currentlySelected = state.selectedAnswers[qData.id] || [];

      qData.answers.forEach(ans => {
        const isSelected = currentlySelected.includes(ans.id);
        const card = document.createElement('button');
        card.type = 'button';
        card.className = `answer-card ${isSelected ? 'selected' : ''}`;
        card.id = `opt_${qData.id}_${ans.id}`;
        card.setAttribute('role', qData.maxChoices === 1 ? 'radio' : 'checkbox');
        card.setAttribute('aria-checked', isSelected ? 'true' : 'false');
        card.setAttribute('data-answer-id', ans.id);
        card.setAttribute('tabindex', '0');

        card.innerHTML = `
          <span class="answer-text">${ans.text}</span>
          <span class="selection-indicator" aria-hidden="true">
            <svg class="indicator-check" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round">
              <polyline points="20 6 9 17 4 12"></polyline>
            </svg>
          </span>
        `;

        // Click interaction
        card.addEventListener('click', () => {
          handleAnswerSelect(ans.id);
        });

        // Keyboard interaction (Enter / Space)
        card.addEventListener('keydown', (e) => {
          if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            handleAnswerSelect(ans.id);
          }
        });

        DOM.answersList.appendChild(card);
      });

      // 3. Update Progress & Next Button state
      updateProgress();
      updateNextButtonState();

      // 4. Update Next button label on final question
      if (state.currentQuestionIndex === state.questionsList.length - 1) {
        DOM.nextBtnText.textContent = 'View Landscape';
      } else {
        DOM.nextBtnText.textContent = 'Next';
      }

      // Smooth enter animation
      DOM.questionContainer.classList.remove('fade-out', 'fade-out-back');
      DOM.questionContainer.classList.add('fade-in');

      setTimeout(() => {
        DOM.questionContainer.classList.remove('fade-in');
        state.isTransitioning = false;
      }, 300);
    };

    if (animate) {
      state.isTransitioning = true;
      const fadeClass = direction === 'back' ? 'fade-out-back' : 'fade-out';
      DOM.questionContainer.classList.add(fadeClass);
      setTimeout(executeRender, 240);
    } else {
      executeRender();
    }
  }

  // =========================================================================
  // 8. SELECTION LOGIC & MULTI-SELECT ENFORCEMENT
  // =========================================================================

  /**
   * Handle user selecting an answer card
   */
  function handleAnswerSelect(answerId) {
    if (state.isTransitioning) return;

    const qData = state.questionsList[state.currentQuestionIndex];
    if (!qData) return;

    let selections = state.selectedAnswers[qData.id] ? [...state.selectedAnswers[qData.id]] : [];
    const isAlreadySelected = selections.includes(answerId);
    const maxChoices = qData.maxChoices || 2;

    if (isAlreadySelected) {
      // Deselect option
      selections = selections.filter(id => id !== answerId);
    } else {
      if (maxChoices === 1) {
        // Single selection (e.g. intensity questions)
        selections = [answerId];
      } else {
        // Multi-selection (max choices)
        if (selections.length >= maxChoices) {
          // Gentle limit pulse feedback
          DOM.instructionText.classList.remove('limit-reached');
          void DOM.instructionText.offsetWidth; // Force reflow
          DOM.instructionText.classList.add('limit-reached');
          return;
        }
        selections.push(answerId);
      }
    }

    state.selectedAnswers[qData.id] = selections;

    // Fast visual update of card states without re-rendering entire list
    const allCards = DOM.answersList.querySelectorAll('.answer-card');
    allCards.forEach(card => {
      const cardAnswerId = card.getAttribute('data-answer-id');
      const selected = selections.includes(cardAnswerId);
      card.classList.toggle('selected', selected);
      card.setAttribute('aria-checked', selected ? 'true' : 'false');
    });

    updateNextButtonState();
  }

  /**
   * Enable Next button only when at least 1 option is chosen
   */
  function updateNextButtonState() {
    const qData = state.questionsList[state.currentQuestionIndex];
    if (!qData) return;

    const selections = state.selectedAnswers[qData.id] || [];
    const hasSelection = selections.length > 0;
    DOM.nextBtn.disabled = !hasSelection;
  }

  // =========================================================================
  // 9. NAVIGATION HANDLERS (Next / Back)
  // =========================================================================

  /**
   * Advance to next question or evaluate Phase 1 scoring & transition
   */
  function goToNextQuestion() {
    if (state.isTransitioning || DOM.nextBtn.disabled) return;

    // Check if we are completing the 7th primary question
    if (state.currentQuestionIndex === PRIMARY_QUESTIONS.length - 1) {
      const scores = calculateEmotionScores();
      const finalEmotions = determineFinalEmotions(scores);
      state.finalEmotions = finalEmotions;

      // Special case: Zero scores (no strong emotion detected)
      if (finalEmotions.length === 0) {
        state.identifiedEmotions = [];
        renderResults();
        switchView('result');
        return;
      }

      // Prepare dynamic intensity questions for each final emotion
      const intensityQuestions = buildIntensityQuestions(finalEmotions);
      state.questionsList = [...PRIMARY_QUESTIONS, ...intensityQuestions];
    }

    // If more questions remain in the queue (primary or intensity)
    if (state.currentQuestionIndex < state.questionsList.length - 1) {
      state.currentQuestionIndex++;
      renderCurrentQuestion(true, 'forward');
    } else {
      // Completed all questions (including intensity questions), finalize results
      evaluateFinalResults();
    }
  }

  /**
   * Return to previous question preserving state
   */
  function goToPreviousQuestion() {
    if (state.isTransitioning || state.currentQuestionIndex === 0) return;

    state.currentQuestionIndex--;
    renderCurrentQuestion(true, 'back');
  }

  // =========================================================================
  // 10. FINAL RESULT EVALUATION & RENDERING
  // =========================================================================

  /**
   * Map each final emotion and its selected intensity tier to Plutchik taxonomy
   */
  function evaluateFinalResults() {
    // Check if a custom scoring model hook is registered
    if (typeof state.customScoringModel === 'function') {
      try {
        const customResults = state.customScoringModel(state.selectedAnswers, state.questionsList);
        if (Array.isArray(customResults)) {
          state.identifiedEmotions = customResults;
          renderResults();
          switchView('result');
          return;
        }
      } catch (err) {
        console.warn('Custom scoring model error, fallback to built-in model:', err);
      }
    }

    const results = [];
    const intensityQuestions = state.questionsList.filter(q => q.isIntensity);

    intensityQuestions.forEach(iq => {
      const selections = state.selectedAnswers[iq.id] || [];
      let level = 'medium'; // default

      if (selections.length > 0) {
        const matchedAnswer = iq.answers.find(a => a.id === selections[0]);
        if (matchedAnswer && matchedAnswer.level) {
          level = matchedAnswer.level;
        }
      }

      const emoTax = PLUTCHIK_EMOTION_TAXONOMY[iq.emotionKey];
      if (emoTax && emoTax.levels[level]) {
        results.push({
          emotionKey: iq.emotionKey,
          family: emoTax.name,
          color: emoTax.color,
          level: level,
          label: emoTax.levels[level].label,
          description: emoTax.levels[level].description,
          allLevels: emoTax.levels
        });
      }
    });

    state.identifiedEmotions = results;
    renderResults();
    switchView('result');
  }

  /**
   * Generates a 3-layer concentric radial intensity wheel SVG for a single emotion result
   * utilizing the shared EMOTION_COLOR_PALETTE single source of truth.
   * - Low Tier (Outer): Lighter / softer pastel variation
   * - Medium Tier (Middle): Exact base emotion color from the large Plutchik wheel
   * - High Tier (Inner Core): Deeper / richer variation of the same color family
   */
  function generateThreeTierWheelSvg(emotionKey, currentLevel) {
    const emo = PLUTCHIK_EMOTION_TAXONOMY[emotionKey];
    const palette = EMOTION_COLOR_PALETTE[emotionKey] || {
      low: '#e2d6eb',
      medium: '#b39ddb',
      high: '#7e57c2',
      accent: '#5e35b1',
      bgSubtle: '#f8f4ff'
    };

    if (!emo) return '';

    const lowLabel = emo.levels.low.label;
    const medLabel = emo.levels.medium.label;
    const highLabel = emo.levels.high.label;

    const isLow = currentLevel === 'low';
    const isMed = currentLevel === 'medium';
    const isHigh = currentLevel === 'high';

    const cx = 80;
    const cy = 80;

    // High contrast text color for the inner core
    const highTextColor = (['joy', 'anticipation'].includes(emotionKey)) ? '#2d1624' : '#ffffff';

    return `
      <svg class="three-tier-wheel-svg" viewBox="0 0 160 160" aria-label="${emo.name} 3-layer intensity wheel">
        <defs>
          <filter id="activeGlow-${emotionKey}" x="-30%" y="-30%" width="160%" height="160%">
            <feDropShadow dx="0" dy="1" stdDeviation="3.5" flood-color="${palette.accent}" flood-opacity="0.65"/>
          </filter>
        </defs>

        <!-- Outer Tier: Low Intensity (${lowLabel}) - Soft Pastel -->
        <circle cx="${cx}" cy="${cy}" r="70" 
          class="tier-concentric-ring ${isLow ? 'active-ring' : 'inactive-ring'}"
          fill="${palette.low}" 
          fill-opacity="${isLow ? '1' : '0.72'}" 
          stroke="${isLow ? palette.accent : '#ffffff'}" 
          stroke-width="${isLow ? '2.5' : '1.2'}"
          ${isLow ? `filter="url(#activeGlow-${emotionKey})"` : ''}
        >
          <title>Low Intensity: ${lowLabel}</title>
        </circle>

        <!-- Middle Tier: Medium Intensity (${medLabel}) - Exact Base Color from Large Wheel -->
        <circle cx="${cx}" cy="${cy}" r="47" 
          class="tier-concentric-ring ${isMed ? 'active-ring' : 'inactive-ring'}"
          fill="${palette.medium}" 
          fill-opacity="${isMed ? '1' : '0.76'}" 
          stroke="${isMed ? palette.accent : '#ffffff'}" 
          stroke-width="${isMed ? '2.5' : '1.2'}"
          ${isMed ? `filter="url(#activeGlow-${emotionKey})"` : ''}
        >
          <title>Medium Intensity (Base): ${medLabel}</title>
        </circle>

        <!-- Inner Core Tier: High Intensity (${highLabel}) - Deep Rich Color -->
        <circle cx="${cx}" cy="${cy}" r="25" 
          class="tier-concentric-ring ${isHigh ? 'active-ring' : 'inactive-ring'}"
          fill="${palette.high}" 
          fill-opacity="${isHigh ? '1' : '0.82'}" 
          stroke="${isHigh ? palette.accent : '#ffffff'}" 
          stroke-width="${isHigh ? '2.5' : '1.2'}"
          ${isHigh ? `filter="url(#activeGlow-${emotionKey})"` : ''}
        >
          <title>High Intensity: ${highLabel}</title>
        </circle>

        <!-- Concentric Ring Text Labels -->
        <text x="${cx}" y="24" class="tier-ring-label" fill="#2d1624" font-weight="${isLow ? '700' : '600'}" font-size="9">
          ${lowLabel}
        </text>
        <text x="${cx}" y="47" class="tier-ring-label" fill="#2d1624" font-weight="${isMed ? '700' : '600'}" font-size="9">
          ${medLabel}
        </text>
        <text x="${cx}" y="${cy + 3}" class="tier-ring-label" fill="${highTextColor}" font-weight="${isHigh ? '700' : '600'}" font-size="9">
          ${highLabel}
        </text>
      </svg>
    `;
  }

  /**
   * Renders the result page (zero-state OR dynamic list of emotion cards with 3-tier visualizers)
   */
  function renderResults() {
    DOM.emotionResultsList.innerHTML = '';

    // ZERO SCORE CASE: No strong emotion identified
    if (!state.identifiedEmotions || state.identifiedEmotions.length === 0) {
      if (DOM.resultHeader) DOM.resultHeader.style.display = 'none';
      if (DOM.wheelSection) DOM.wheelSection.style.display = 'none';
      if (DOM.downloadSummaryBtn) DOM.downloadSummaryBtn.style.display = 'none';
      if (DOM.zeroResultCard) DOM.zeroResultCard.style.display = 'flex';
      return;
    }

    // STANDARD RESULTS CASE: Display identified emotion cards & wheel
    if (DOM.resultHeader) DOM.resultHeader.style.display = 'block';
    if (DOM.wheelSection) DOM.wheelSection.style.display = 'block';
    if (DOM.downloadSummaryBtn) DOM.downloadSummaryBtn.style.display = 'inline-flex';
    if (DOM.zeroResultCard) DOM.zeroResultCard.style.display = 'none';

    state.identifiedEmotions.forEach(res => {
      const card = document.createElement('div');
      card.className = 'result-emotion-card';

      const palette = EMOTION_COLOR_PALETTE[res.emotionKey] || {
        low: '#e2d6eb',
        medium: '#b39ddb',
        high: '#7e57c2',
        accent: '#5e35b1',
        bgSubtle: '#f8f4ff'
      };

      // Subtitle descriptor based on intensity level
      let layerSubtitle = '';
      if (res.level === 'low') {
        layerSubtitle = `A gentle layer within the ${res.family} family`;
      } else if (res.level === 'high') {
        layerSubtitle = `A strong, heightened layer within the ${res.family} family`;
      } else {
        layerSubtitle = `A clear, balanced layer within the ${res.family} family`;
      }

      const levelBadgeText = res.level.charAt(0).toUpperCase() + res.level.slice(1) + ' Intensity';

      // 3-Tier Plutchik labels for this emotion family
      const lowLabel = res.allLevels.low.label;
      const medLabel = res.allLevels.medium.label;
      const highLabel = res.allLevels.high.label;

      const highTextColor = (['joy', 'anticipation'].includes(res.emotionKey)) ? '#2d1624' : '#ffffff';

      card.innerHTML = `
        <div class="result-card-top">
          <div class="result-emotion-title-group">
            <h3 class="result-emotion-name">${res.label}</h3>
            <span class="result-family-subtitle">${layerSubtitle}</span>
          </div>
          <span class="result-intensity-badge" style="background: ${palette.bgSubtle}; color: ${palette.accent}; border-color: ${palette.medium};">${levelBadgeText}</span>
        </div>

        <p class="result-emotion-desc">${res.description}</p>

        <!-- True Three-Layer Plutchik Intensity Radial Wheel & Track -->
        <div class="plutchik-intensity-visualizer" aria-label="${res.family} three-layer intensity continuum">
          <div class="intensity-visualizer-header">
            <span class="intensity-visualizer-title">Three-Layer Intensity Wheel</span>
            <span class="intensity-visualizer-family" style="color: ${palette.accent}; font-weight: 600;">${res.family} Family</span>
          </div>

          <div class="plutchik-3tier-wheel-layout">
            <div class="intensity-wheel-graphic-container" aria-hidden="true">
              ${generateThreeTierWheelSvg(res.emotionKey, res.level)}
            </div>

            <div class="intensity-tiers-track" role="list" aria-label="${res.family} intensity layers">
              <!-- Tier 3: High Intensity (Deep color) -->
              <div class="intensity-tier-row ${res.level === 'high' ? 'active-tier' : ''}" 
                style="${res.level === 'high' ? `border-color: ${palette.accent}; box-shadow: 0 3px 12px ${palette.medium}44; background: #ffffff; opacity: 1;` : ''}" 
                role="listitem">
                <div class="tier-row-left">
                  <span class="tier-level-badge" style="background: ${palette.high}; color: ${highTextColor}; border-color: ${palette.accent}; font-weight: 700;">High</span>
                  <span class="tier-emotion-label">${highLabel}</span>
                </div>
                ${res.level === 'high' ? `<span class="current-intensity-marker" style="color: ${palette.accent}; border-color: ${palette.medium}; background: ${palette.bgSubtle};" aria-label="Current intensity">● Current Intensity</span>` : ''}
              </div>

              <!-- Tier 2: Medium Intensity (Exact Base Color) -->
              <div class="intensity-tier-row ${res.level === 'medium' ? 'active-tier' : ''}" 
                style="${res.level === 'medium' ? `border-color: ${palette.accent}; box-shadow: 0 3px 12px ${palette.medium}44; background: #ffffff; opacity: 1;` : ''}" 
                role="listitem">
                <div class="tier-row-left">
                  <span class="tier-level-badge" style="background: ${palette.medium}; color: #2d1624; border-color: ${palette.accent}; font-weight: 700;">Medium</span>
                  <span class="tier-emotion-label">${medLabel}</span>
                </div>
                ${res.level === 'medium' ? `<span class="current-intensity-marker" style="color: ${palette.accent}; border-color: ${palette.medium}; background: ${palette.bgSubtle};" aria-label="Current intensity">● Current Intensity</span>` : ''}
              </div>

              <!-- Tier 1: Low Intensity (Light Pastel Color) -->
              <div class="intensity-tier-row ${res.level === 'low' ? 'active-tier' : ''}" 
                style="${res.level === 'low' ? `border-color: ${palette.accent}; box-shadow: 0 3px 12px ${palette.medium}44; background: #ffffff; opacity: 1;` : ''}" 
                role="listitem">
                <div class="tier-row-left">
                  <span class="tier-level-badge" style="background: ${palette.low}; color: #2d1624; border-color: ${palette.medium}; font-weight: 700;">Low</span>
                  <span class="tier-emotion-label">${lowLabel}</span>
                </div>
                ${res.level === 'low' ? `<span class="current-intensity-marker" style="color: ${palette.accent}; border-color: ${palette.medium}; background: ${palette.bgSubtle};" aria-label="Current intensity">● Current Intensity</span>` : ''}
              </div>
            </div>
          </div>
        </div>
      `;

      DOM.emotionResultsList.appendChild(card);
    });

    // Render interactive SVG Plutchik Wheel with highlighted petals
    renderPlutchikWheelSvg();
  }

  /**
   * Renders the 8-petal Plutchik Wheel SVG highlighting identified emotions
   * Uses the shared EMOTION_COLOR_PALETTE medium (base) colors.
   */
  function renderPlutchikWheelSvg() {
    if (!DOM.plutchikWheelSvg) return;

    const centerX = 150;
    const centerY = 150;
    const outerRadius = 118;
    const innerRadius = 38;

    const emotionKeys = ['joy', 'trust', 'fear', 'surprise', 'sadness', 'disgust', 'anger', 'anticipation'];
    const identifiedKeys = state.identifiedEmotions.map(e => e.emotionKey);

    let svgHtml = '';

    // Generate 8 Petal Segments
    emotionKeys.forEach((key, index) => {
      const angleStart = (index * 45 - 22.5) * (Math.PI / 180);
      const angleEnd = (index * 45 + 22.5) * (Math.PI / 180);
      const angleMid = (index * 45) * (Math.PI / 180);

      const x1 = centerX + innerRadius * Math.cos(angleStart);
      const y1 = centerY + innerRadius * Math.sin(angleStart);
      const x2 = centerX + outerRadius * Math.cos(angleStart);
      const y2 = centerY + outerRadius * Math.sin(angleStart);
      const x3 = centerX + outerRadius * Math.cos(angleEnd);
      const y3 = centerY + outerRadius * Math.sin(angleEnd);
      const x4 = centerX + innerRadius * Math.cos(angleEnd);
      const y4 = centerY + innerRadius * Math.sin(angleEnd);

      const isIdentified = identifiedKeys.includes(key);
      const emoData = PLUTCHIK_EMOTION_TAXONOMY[key];
      const palette = EMOTION_COLOR_PALETTE[key];

      const fillColor = isIdentified ? palette.medium : '#f8f4ff';
      const fillOpacity = isIdentified ? '0.88' : '0.4';
      const strokeColor = isIdentified ? palette.accent : '#e6e6fa';
      const strokeWidth = isIdentified ? '2' : '1';

      // Petal path
      const pathD = `M ${x1} ${y1} L ${x2} ${y2} A ${outerRadius} ${outerRadius} 0 0 1 ${x3} ${y3} L ${x4} ${y4} A ${innerRadius} ${innerRadius} 0 0 0 ${x1} ${y1} Z`;

      // Label coordinate
      const labelRadius = (innerRadius + outerRadius) / 2;
      const lx = centerX + labelRadius * Math.cos(angleMid);
      const ly = centerY + labelRadius * Math.sin(angleMid) + 4;

      svgHtml += `
        <path d="${pathD}" fill="${fillColor}" fill-opacity="${fillOpacity}" stroke="${strokeColor}" stroke-width="${strokeWidth}">
          <title>${emoData.name}</title>
        </path>
        <text x="${lx}" y="${ly}" font-family="var(--font-sans)" font-size="${isIdentified ? '10' : '8.5'}" font-weight="${isIdentified ? '700' : '500'}" fill="${isIdentified ? '#2d1624' : '#8b7a87'}" text-anchor="middle" pointer-events="none">
          ${emoData.name}
        </text>
      `;
    });

    // Center Hub
    svgHtml += `
      <circle cx="${centerX}" cy="${centerY}" r="${innerRadius - 4}" fill="#ffffff" stroke="#d1c4e9" stroke-width="1.5" />
      <circle cx="${centerX}" cy="${centerY}" r="6" fill="#b39ddb" />
    `;

    DOM.plutchikWheelSvg.innerHTML = svgHtml;
  }

  // =========================================================================
  // 11. KEYBOARD NAVIGATION SHORTCUTS
  // =========================================================================

  function handleGlobalKeyDown(e) {
    if (state.currentView !== 'question' || state.isTransitioning) return;

    // Number keys 1-9 to quickly select options
    const keyNum = parseInt(e.key, 10);
    if (!isNaN(keyNum) && keyNum >= 1 && keyNum <= 9) {
      const qData = state.questionsList[state.currentQuestionIndex];
      if (qData && qData.answers[keyNum - 1]) {
        handleAnswerSelect(qData.answers[keyNum - 1].id);
      }
    }

    // Enter key to proceed if Next button is enabled
    if (e.key === 'Enter' && !DOM.nextBtn.disabled && document.activeElement.tagName !== 'BUTTON') {
      goToNextQuestion();
    }
  }

  // =========================================================================
  // 12. EXPANDABLE SECTION & COMMUNITY FEEDBACK HANDLERS
  // =========================================================================

  /**
   * Toggles the expandable "What is Plutchik's Wheel of Emotions?" section on Start Page
   */
  function togglePlutchikExplanation(e) {
    if (e) e.preventDefault();
    if (!DOM.plutchikToggleBtn || !DOM.plutchikExpandedContent) return;

    const isCurrentlyExpanded = DOM.plutchikToggleBtn.getAttribute('aria-expanded') === 'true';
    const nextState = !isCurrentlyExpanded;

    DOM.plutchikToggleBtn.setAttribute('aria-expanded', nextState ? 'true' : 'false');
    
    if (nextState) {
      DOM.plutchikExpandedContent.classList.add('open');
    } else {
      DOM.plutchikExpandedContent.classList.remove('open');
    }
  }

  /**
   * Opens the feedback & comment dialog
   */
  function openCommentModal(e) {
    if (e) e.preventDefault();
    if (!DOM.commentModal) return;

    DOM.commentModal.classList.add('open');
    DOM.commentModal.setAttribute('aria-hidden', 'false');
    if (DOM.commentForm) DOM.commentForm.style.display = 'flex';
    if (DOM.commentSuccessMsg) DOM.commentSuccessMsg.style.display = 'none';
    if (DOM.commentTextInput) {
      DOM.commentTextInput.value = '';
      setTimeout(() => DOM.commentTextInput.focus(), 150);
    }
  }

  /**
   * Closes the feedback & comment dialog
   */
  function closeCommentModal() {
    if (!DOM.commentModal) return;
    DOM.commentModal.classList.remove('open');
    DOM.commentModal.setAttribute('aria-hidden', 'true');
  }

  /**
   * Handles comment submission
   */
async function handleCommentSubmit(e) {
  e.preventDefault();

  if (!DOM.commentTextInput || !DOM.commentTextInput.value.trim()) return;

  const submitButton = document.getElementById('submitCommentBtn');

  try {
    if (submitButton) {
      submitButton.disabled = true;
      submitButton.textContent = 'Sending...';
    }

    const formData = new FormData(DOM.commentForm);

    const response = await fetch('https://formspree.io/f/mnpagppj', {
      method: 'POST',
      body: formData,
      headers: {
        'Accept': 'application/json'
      }
    });

    if (!response.ok) {
      throw new Error('Comment submission failed.');
    }

    if (DOM.commentForm) {
      DOM.commentForm.style.display = 'none';
    }

    if (DOM.commentSuccessMsg) {
      DOM.commentSuccessMsg.style.display = 'flex';
    }

    DOM.commentTextInput.value = '';

    setTimeout(() => {
      closeCommentModal();
    }, 1800);

  } catch (error) {
    console.error('Formspree submission error:', error);
    alert('Sorry, your comment could not be sent. Please try again.');

  } finally {
    if (submitButton) {
      submitButton.disabled = false;
      submitButton.textContent = 'Send Comment';
    }
  }
}

  // =========================================================================
  // =========================================================================
  // 13. DOWNLOAD EMOTION SUMMARY AS PDF (Pure Client-Side Generation)
  // =========================================================================

  /**
   * Helper function to convert Hex color to RGB array for jsPDF
   */
  function hexToRgb(hex) {
    if (!hex) return [200, 200, 200];
    const clean = hex.replace('#', '');
    const bigint = parseInt(clean, 16);
    return [
      (bigint >> 16) & 255,
      (bigint >> 8) & 255,
      bigint & 255
    ];
  }

  /**
   * Generates and downloads a standalone, beautifully designed Emotion Summary PDF document
   * Completely client-side (GitHub Pages compatible), using Robert Plutchik's framework
   * with the 3-layer intensity visualization and unified color palette.
   */
  function downloadEmotionSummary() {
    if (!state.identifiedEmotions || state.identifiedEmotions.length === 0) return;

    // Resolve jsPDF from global window.jspdf or window.jsPDF
    const jsPDFClass = (window.jspdf && window.jspdf.jsPDF) ? window.jspdf.jsPDF : (typeof jsPDF !== 'undefined' ? jsPDF : null);

    if (!jsPDFClass) {
      console.error('jsPDF library not available in browser environment.');
      return;
    }

    const doc = new jsPDFClass({
      orientation: 'portrait',
      unit: 'mm',
      format: 'a4'
    });

    const pageWidth = 210;
    const pageHeight = 297;
    const marginLeft = 18;
    const marginRight = 18;
    const contentWidth = pageWidth - marginLeft - marginRight; // 174mm
    const bottomMargin = 20;

    let currentY = 22;

    const dateStr = new Date().toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });

    // -----------------------------------------------------------------------
    // Document Header
    // -----------------------------------------------------------------------
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(22);
    doc.setTextColor(45, 22, 36); // #2d1624
    doc.text('Emotion Explorer', pageWidth / 2, currentY, { align: 'center' });
    currentY += 7;

    doc.setFont('helvetica', 'bold');
    doc.setFontSize(10.5);
    doc.setTextColor(126, 87, 194); // #7e57c2
    doc.text('YOUR EMOTIONAL LANDSCAPE', pageWidth / 2, currentY, { align: 'center' });
    currentY += 5.5;

    doc.setFont('helvetica', 'normal');
    doc.setFontSize(8.5);
    doc.setTextColor(139, 122, 135); // #8b7a87
    doc.text('Reflection Date: ' + dateStr, pageWidth / 2, currentY, { align: 'center' });
    currentY += 6;

    // Header divider line
    doc.setDrawColor(243, 229, 245);
    doc.setLineWidth(0.4);
    doc.line(marginLeft, currentY, marginLeft + contentWidth, currentY);
    currentY += 7;

    doc.setFont('helvetica', 'bold');
    doc.setFontSize(10.5);
    doc.setTextColor(74, 29, 51); // #4a1d33
    doc.text('Your responses point toward:', marginLeft, currentY);
    currentY += 6;

    // -----------------------------------------------------------------------
    // Identified Emotion Result Cards
    // -----------------------------------------------------------------------
    state.identifiedEmotions.forEach(res => {
      const palette = EMOTION_COLOR_PALETTE[res.emotionKey] || {
        low: '#e2d6eb',
        medium: '#b39ddb',
        high: '#7e57c2',
        accent: '#5e35b1',
        bgSubtle: '#f8f4ff'
      };

      const levelTitle = res.level.charAt(0).toUpperCase() + res.level.slice(1);
      const lowLabel = res.allLevels.low.label;
      const medLabel = res.allLevels.medium.label;
      const highLabel = res.allLevels.high.label;

      const highTextColor = (['joy', 'anticipation'].includes(res.emotionKey)) ? '#2d1624' : '#ffffff';

      // Split description text to fit within card width
      doc.setFont('helvetica', 'normal');
      doc.setFontSize(8.5);
      const descLines = doc.splitTextToSize(res.description, contentWidth - 18);

      // Card height calculation
      const cardHeight = 14 + (descLines.length * 4.2) + 38;

      // Page break check
      if (currentY + cardHeight > pageHeight - bottomMargin - 10) {
        doc.addPage();
        currentY = 22;
      }

      // Card background & subtle border
      doc.setFillColor(254, 252, 254);
      doc.setDrawColor(243, 229, 245);
      doc.setLineWidth(0.4);
      doc.roundedRect(marginLeft, currentY, contentWidth, cardHeight, 3.5, 3.5, 'FD');

      // Left colored accent bar
      const [mr, mg, mb] = hexToRgb(palette.medium);
      doc.setFillColor(mr, mg, mb);
      doc.roundedRect(marginLeft, currentY, 3.5, cardHeight, 1.5, 1.5, 'F');

      let innerY = currentY + 6.5;
      const innerX = marginLeft + 8;

      // Card Header: Title & Meta Badge
      doc.setFont('helvetica', 'bold');
      doc.setFontSize(13.5);
      doc.setTextColor(45, 22, 36);
      doc.text(res.label.toUpperCase(), innerX, innerY);

      // Meta badge text
      const metaText = `${res.family} family · ${levelTitle} intensity`;
      const metaWidth = doc.getTextWidth(metaText) + 6;
      const metaX = marginLeft + contentWidth - metaWidth - 4;

      const [bgr, bgg, bgb] = hexToRgb(palette.bgSubtle);
      const [acr, acg, acb] = hexToRgb(palette.accent);
      doc.setFillColor(bgr, bgg, bgb);
      doc.setDrawColor(mr, mg, mb);
      doc.setLineWidth(0.3);
      doc.roundedRect(metaX, innerY - 4.5, metaWidth, 6, 2, 2, 'FD');

      doc.setFont('helvetica', 'bold');
      doc.setFontSize(8);
      doc.setTextColor(acr, acg, acb);
      doc.text(metaText, metaX + 3, innerY - 0.5);

      innerY += 6;

      // Description text
      doc.setFont('helvetica', 'normal');
      doc.setFontSize(8.5);
      doc.setTextColor(74, 29, 51);
      doc.text(descLines, innerX, innerY);
      innerY += (descLines.length * 4.2) + 3;

      // ---------------------------------------------------------------------
      // Three-Layer Intensity Graphic (Vector Concentric Circles)
      // ---------------------------------------------------------------------
      const cx = innerX + 16;
      const cy = innerY + 14;

      // Outer Tier: Low Intensity (Pastel)
      const [lr, lg, lb] = hexToRgb(palette.low);
      doc.setFillColor(lr, lg, lb);
      if (res.level === 'low') {
        doc.setDrawColor(acr, acg, acb);
        doc.setLineWidth(0.7);
      } else {
        doc.setDrawColor(255, 255, 255);
        doc.setLineWidth(0.35);
      }
      doc.circle(cx, cy, 14, 'FD');

      // Middle Tier: Medium Intensity (Exact Base Color)
      doc.setFillColor(mr, mg, mb);
      if (res.level === 'medium') {
        doc.setDrawColor(acr, acg, acb);
        doc.setLineWidth(0.7);
      } else {
        doc.setDrawColor(255, 255, 255);
        doc.setLineWidth(0.35);
      }
      doc.circle(cx, cy, 9.5, 'FD');

      // Inner Core Tier: High Intensity (Deep Color)
      const [hr, hg, hb] = hexToRgb(palette.high);
      doc.setFillColor(hr, hg, hb);
      if (res.level === 'high') {
        doc.setDrawColor(acr, acg, acb);
        doc.setLineWidth(0.7);
      } else {
        doc.setDrawColor(255, 255, 255);
        doc.setLineWidth(0.35);
      }
      doc.circle(cx, cy, 5, 'FD');

      // Ring text labels
      doc.setFont('helvetica', res.level === 'low' ? 'bold' : 'normal');
      doc.setFontSize(5.5);
      doc.setTextColor(45, 22, 36);
      doc.text(lowLabel, cx, cy - 10.2, { align: 'center' });

      doc.setFont('helvetica', res.level === 'medium' ? 'bold' : 'normal');
      doc.setFontSize(5.5);
      doc.setTextColor(45, 22, 36);
      doc.text(medLabel, cx, cy - 6, { align: 'center' });

      const [htr, htg, htb] = hexToRgb(highTextColor);
      doc.setFont('helvetica', res.level === 'high' ? 'bold' : 'normal');
      doc.setFontSize(5.5);
      doc.setTextColor(htr, htg, htb);
      doc.text(highLabel, cx, cy + 1.2, { align: 'center' });

      // ---------------------------------------------------------------------
      // Intensity Continuum Rows (Right Side of Graphic)
      // ---------------------------------------------------------------------
      const trackX = innerX + 38;
      const rowWidth = contentWidth - 50;

      // Tier 3: High
      const row1Y = innerY + 3.5;
      doc.setFillColor(hr, hg, hb);
      doc.circle(trackX + 2, row1Y - 1, 1.8, 'F');

      doc.setFont('helvetica', res.level === 'high' ? 'bold' : 'normal');
      doc.setFontSize(8.5);
      doc.setTextColor(45, 22, 36);
      doc.text(`High:  ${highLabel}`, trackX + 6, row1Y);

      if (res.level === 'high') {
        doc.setFillColor(bgr, bgg, bgb);
        doc.setDrawColor(acr, acg, acb);
        doc.setLineWidth(0.3);
        const tagText = '← Current intensity';
        const tagW = doc.getTextWidth(tagText) + 4;
        const tagX = trackX + 6 + doc.getTextWidth(`High:  ${highLabel}`) + 4;
        doc.roundedRect(tagX, row1Y - 3.5, tagW, 4.8, 1.5, 1.5, 'FD');
        doc.setFont('helvetica', 'bold');
        doc.setFontSize(7.5);
        doc.setTextColor(acr, acg, acb);
        doc.text(tagText, tagX + 2, row1Y - 0.2);
      }

      // Tier 2: Medium
      const row2Y = innerY + 12.5;
      doc.setFillColor(mr, mg, mb);
      doc.circle(trackX + 2, row2Y - 1, 1.8, 'F');

      doc.setFont('helvetica', res.level === 'medium' ? 'bold' : 'normal');
      doc.setFontSize(8.5);
      doc.setTextColor(45, 22, 36);
      doc.text(`Medium:  ${medLabel}`, trackX + 6, row2Y);

      if (res.level === 'medium') {
        doc.setFillColor(bgr, bgg, bgb);
        doc.setDrawColor(acr, acg, acb);
        doc.setLineWidth(0.3);
        const tagText = '← Current intensity';
        const tagW = doc.getTextWidth(tagText) + 4;
        const tagX = trackX + 6 + doc.getTextWidth(`Medium:  ${medLabel}`) + 4;
        doc.roundedRect(tagX, row2Y - 3.5, tagW, 4.8, 1.5, 1.5, 'FD');
        doc.setFont('helvetica', 'bold');
        doc.setFontSize(7.5);
        doc.setTextColor(acr, acg, acb);
        doc.text(tagText, tagX + 2, row2Y - 0.2);
      }

      // Tier 1: Low
      const row3Y = innerY + 21.5;
      doc.setFillColor(lr, lg, lb);
      doc.circle(trackX + 2, row3Y - 1, 1.8, 'F');

      doc.setFont('helvetica', res.level === 'low' ? 'bold' : 'normal');
      doc.setFontSize(8.5);
      doc.setTextColor(45, 22, 36);
      doc.text(`Low:  ${lowLabel}`, trackX + 6, row3Y);

      if (res.level === 'low') {
        doc.setFillColor(bgr, bgg, bgb);
        doc.setDrawColor(acr, acg, acb);
        doc.setLineWidth(0.3);
        const tagText = '← Current intensity';
        const tagW = doc.getTextWidth(tagText) + 4;
        const tagX = trackX + 6 + doc.getTextWidth(`Low:  ${lowLabel}`) + 4;
        doc.roundedRect(tagX, row3Y - 3.5, tagW, 4.8, 1.5, 1.5, 'FD');
        doc.setFont('helvetica', 'bold');
        doc.setFontSize(7.5);
        doc.setTextColor(acr, acg, acb);
        doc.text(tagText, tagX + 2, row3Y - 0.2);
      }

      currentY += cardHeight + 6;
    });

    // -----------------------------------------------------------------------
    // About This Framework & Academic Reference Section
    // -----------------------------------------------------------------------
    if (currentY + 36 > pageHeight - bottomMargin - 10) {
      doc.addPage();
      currentY = 22;
    }

    doc.setFillColor(255, 255, 255);
    doc.setDrawColor(243, 229, 245);
    doc.setLineWidth(0.35);
    doc.roundedRect(marginLeft, currentY, contentWidth, 32, 2.5, 2.5, 'FD');

    let fY = currentY + 5.5;
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(9.5);
    doc.setTextColor(45, 22, 36);
    doc.text('About this framework', marginLeft + 6, fY);
    fY += 4.5;

    doc.setFont('helvetica', 'normal');
    doc.setFontSize(8);
    doc.setTextColor(74, 29, 51);
    doc.text('Emotion Explorer uses Robert Plutchik\'s model of emotion as a framework for exploring emotion families and differences in emotional intensity.', marginLeft + 6, fY, { maxWidth: contentWidth - 12 });
    fY += 8;

    // Academic Reference Citation
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(8);
    doc.setTextColor(45, 22, 36);
    doc.text('Reference: ', marginLeft + 6, fY);

    doc.setFont('helvetica', 'italic');
    doc.text('Robert Plutchik. The Nature of Emotions. American Scientist, 89(4), 344–350, 2001.', marginLeft + 23, fY);
    fY += 4.5;

    // Clickable Link
    const refUrl = 'https://www.americanscientist.org/article/the-nature-of-emotions';
    doc.setFont('helvetica', 'normal');
    doc.setTextColor(94, 53, 177); // #5e35b1
    doc.text('Read original article: ' + refUrl, marginLeft + 6, fY);
    const linkWidth = doc.getTextWidth('Read original article: ' + refUrl);
    doc.link(marginLeft + 6, fY - 3, linkWidth, 4.5, { url: refUrl });

    currentY += 37;

    // -----------------------------------------------------------------------
    // Non-Clinical Disclaimer Box (Prominent near bottom)
    // -----------------------------------------------------------------------
    if (currentY + 16 > pageHeight - bottomMargin - 8) {
      doc.addPage();
      currentY = 22;
    }

    doc.setFillColor(253, 249, 253);
    doc.setDrawColor(238, 224, 240);
    doc.setLineWidth(0.3);
    doc.roundedRect(marginLeft, currentY, contentWidth, 13, 2, 2, 'FD');

    doc.setFillColor(179, 157, 219);
    doc.roundedRect(marginLeft, currentY, 2, 13, 1, 1, 'F');

    doc.setFont('helvetica', 'bold');
    doc.setFontSize(7.5);
    doc.setTextColor(112, 88, 105); // #705869
    const discLines = doc.splitTextToSize('For non-clinical self-exploration only. Emotion Explorer does not provide clinical, medical, diagnostic, or professional mental health advice.', contentWidth - 10);
    doc.text(discLines, marginLeft + 5, currentY + 5.2);

    // -----------------------------------------------------------------------
    // Page Footers (Page numbering & Project link across all pages)
    // -----------------------------------------------------------------------
    const totalPages = doc.internal.getNumberOfPages();
    for (let i = 1; i <= totalPages; i++) {
      doc.setPage(i);

      doc.setFont('helvetica', 'normal');
      doc.setFontSize(7.5);
      doc.setTextColor(139, 122, 135);
      doc.text('Generated by Emotion Explorer', marginLeft, 288);

      const ghText = 'Explore the project on GitHub';
      const ghUrl = 'https://github.com/feifeigoose0520-jpg/emotion-explorer';
      const ghX = marginLeft + 44;
      doc.setTextColor(94, 53, 177);
      doc.text(ghText, ghX, 288);
      doc.link(ghX, 285, doc.getTextWidth(ghText), 4, { url: ghUrl });

      doc.setTextColor(139, 122, 135);
      doc.text(`Page ${i} of ${totalPages}`, marginLeft + contentWidth, 288, { align: 'right' });
    }

    // Direct Browser Download
    doc.save('emotion-explorer-summary.pdf');

    showDownloadToast();
  }

  /**
   * Displays temporary confirmation toast after summary download
   */
  function showDownloadToast() {
    let toast = document.getElementById('downloadToast');
    if (!toast) {
      toast = document.createElement('div');
      toast.id = 'downloadToast';
      toast.className = 'download-toast';
      toast.setAttribute('role', 'status');
      toast.setAttribute('aria-live', 'polite');
      toast.innerHTML = '<span class="toast-icon" aria-hidden="true">✓</span><span>Your emotion summary PDF has been downloaded</span>';
      document.body.appendChild(toast);
    }
    toast.classList.add('show');
    setTimeout(() => {
      toast.classList.remove('show');
    }, 3200);
  }

  // =========================================================================
  // 14. INITIALIZATION & PUBLIC API ATTACHMENT
  // =========================================================================

  function init() {
    // Attach Event Listeners
    if (DOM.startBtn) DOM.startBtn.addEventListener('click', startQuestionnaire);
    if (DOM.nextBtn) DOM.nextBtn.addEventListener('click', goToNextQuestion);
    if (DOM.backBtn) DOM.backBtn.addEventListener('click', goToPreviousQuestion);
    if (DOM.restartBtn) DOM.restartBtn.addEventListener('click', startQuestionnaire);
    if (DOM.downloadSummaryBtn) DOM.downloadSummaryBtn.addEventListener('click', downloadEmotionSummary);

    // Expandable Plutchik Section
    if (DOM.plutchikToggleBtn) {
      DOM.plutchikToggleBtn.addEventListener('click', togglePlutchikExplanation);
    }

    // Community Feedback / Leave Comment Modal
    if (DOM.leaveCommentBtnStart) {
      DOM.leaveCommentBtnStart.addEventListener('click', openCommentModal);
    }
    if (DOM.leaveCommentBtnResult) {
      DOM.leaveCommentBtnResult.addEventListener('click', openCommentModal);
    }
    if (DOM.closeCommentModalBtn) {
      DOM.closeCommentModalBtn.addEventListener('click', closeCommentModal);
    }
    if (DOM.cancelCommentBtn) {
      DOM.cancelCommentBtn.addEventListener('click', closeCommentModal);
    }
    if (DOM.commentModal) {
      DOM.commentModal.addEventListener('click', (e) => {
        if (e.target === DOM.commentModal) {
          closeCommentModal();
        }
      });
    }
    if (DOM.commentForm) {
      DOM.commentForm.addEventListener('submit', handleCommentSubmit);
    }

    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && DOM.commentModal && DOM.commentModal.classList.contains('open')) {
        closeCommentModal();
        return;
      }
      handleGlobalKeyDown(e);
    });

    // Initial View setup
    switchView('start');
  }

  // Run on DOM ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }

  // =========================================================================
  // 13. PUBLIC INTEGRATION HOOKS (For user's custom scoring logic)
  // =========================================================================

  window.EmotionExplorer = {
    /**
     * Get the current state of selected answers
     */
    getSelectedAnswers: () => ({ ...state.selectedAnswers }),

    /**
     * Get full application state
     */
    getState: () => ({ ...state }),

    /**
     * Helper to compute emotion scores
     */
    calculateEmotionScores: calculateEmotionScores,

    /**
     * Helper to determine final emotions
     */
    determineFinalEmotions: determineFinalEmotions,

    /**
     * Hook to attach a custom scoring algorithm
     * @param {Function} scoringFn - (selectedAnswers, questionsList) => [{ label, description, level, family, allLevels }]
     */
    setCustomScoringModel: (scoringFn) => {
      if (typeof scoringFn === 'function') {
        state.customScoringModel = scoringFn;
      }
    },

    /**
     * Directly navigate to start
     */
    start: startQuestionnaire,

    /**
     * Navigate to specific question index
     */
    goToQuestion: (index) => {
      if (index >= 0 && index < state.questionsList.length) {
        state.currentQuestionIndex = index;
        renderCurrentQuestion(true);
      }
    },

    /**
     * Plutchik taxonomy dictionary
     */
    taxonomy: PLUTCHIK_EMOTION_TAXONOMY
  };

})();
