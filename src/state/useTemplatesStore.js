import { create } from 'zustand';
import {
  addTemplateToDb,
  applyTemplateToDate,
  deleteTemplateInDb,
  getTemplates,
  updateTemplateInDb
} from '../db';
import { getTodayKey } from '../utils/date';

export const useTemplatesStore = create((set, get) => ({
  templates: [],
  loading: false,
  loadTemplates: async () => {
    set({ loading: true });
    const templates = await getTemplates();
    set({ templates, loading: false });
  },
  addTemplate: async (template) => {
    const created = await addTemplateToDb(template);
    set((state) => ({ templates: [...state.templates, created] }));
    return created;
  },
  updateTemplate: async (id, updates) => {
    await updateTemplateInDb(id, updates);
    set((state) => ({ templates: state.templates.map((tpl) => (tpl.id === id ? { ...tpl, ...updates } : tpl)) }));
  },
  deleteTemplate: async (id) => {
    await deleteTemplateInDb(id);
    set((state) => ({ templates: state.templates.filter((tpl) => tpl.id !== id) }));
  },
  duplicateTemplate: async (template) => {
    const copy = {
      ...template,
      id: undefined,
      name: `${template.name} Copy`,
      tasks: (template.tasks || []).map(({ id: _id, ...rest }) => rest)
    };
    return get().addTemplate(copy);
  },
  applyTemplate: async (templateId, date = getTodayKey()) => {
    const template = get().templates.find((tpl) => tpl.id === templateId);
    if (!template) return [];
    const created = await applyTemplateToDate(template, date);
    return created;
  }
}));
