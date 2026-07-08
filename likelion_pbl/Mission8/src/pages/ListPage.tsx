import { useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { filterAndSort } from '../utils/transform';
import ControlArea from '../components/ControlArea';
import OptionsSection from '../components/OptionsSection';
import FormSection from '../components/FormSection';
import SummaryGrid from '../components/SummaryGrid';
import type { FilterValue, SortValue } from '../types/lion';
import type { UseFormReturn, UseLionsReturn } from '../types/hooks';

type ListPageProps = UseLionsReturn & UseFormReturn;

function isFilterValue(value: string): value is FilterValue {
  return value === 'all' || value === 'Frontend' || value === 'Backend' || value === 'Design';
}

function isSortValue(value: string): value is SortValue {
  return value === 'latest' || value === 'name';
}

function ListPage({
  lions, status, errorMsg, fetchUsers, addLion, deleteLast, retry,
  form, show, fillLoading, toggle, close, handleChange, isValid, buildLion, randomFill,
}: ListPageProps) {
  const [searchParams] = useSearchParams();

  const rawFilter = searchParams.get('part') || 'all';
  const rawSort = searchParams.get('sort') || 'latest';
  const filter: FilterValue = isFilterValue(rawFilter) ? rawFilter : 'all';
  const sort: SortValue = isSortValue(rawSort) ? rawSort : 'latest';
  const search = searchParams.get('q') || '';

  const displayed = filterAndSort(lions, filter, sort, search);

  // ESC 키로 폼 닫기
  useEffect(() => {
    function handleKeyDown(e: KeyboardEvent) {
      if (e.key === 'Escape') close();
    }
    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  function handleSubmit() {
    if (!isValid()) {
      alert('모든 항목을 입력해주세요. (Website 제외)');
      return;
    }
    addLion(buildLion());
    close();
  }

  return (
    <>
      <ControlArea
        totalCount={lions.length}
        status={status}
        errorMsg={errorMsg}
        onToggleForm={toggle}
        onDeleteLast={deleteLast}
        onFetchOne={() => fetchUsers(1)}
        onFetchFive={() => fetchUsers(5)}
        onRefresh={() => fetchUsers(lions.length - (lions.find((l) => l.isMe) ? 1 : 0) || 5, true)}
        onRetry={retry}
      />
      <OptionsSection />
      <FormSection
        show={show}
        form={form}
        fillLoading={fillLoading}
        onChange={handleChange}
        onSubmit={handleSubmit}
        onCancel={close}
        onRandomFill={randomFill}
      />
      <main>
        <SummaryGrid lions={displayed} />
      </main>
    </>
  );
}

export default ListPage;
