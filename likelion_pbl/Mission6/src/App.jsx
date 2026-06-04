import { useState, useEffect } from 'react';
import { useLions } from './hooks/useLions';
import { useForm } from './hooks/useForm';
import { filterAndSort } from './utils/transform';
import Header from './components/Header';
import ControlArea from './components/ControlArea';
import OptionsSection from './components/OptionsSection';
import FormSection from './components/FormSection';
import SummaryGrid from './components/SummaryGrid';
import DetailList from './components/DetailList';
import Footer from './components/Footer';
import './styles/style.css';

function App() {
  const { lions, status, errorMsg, fetchUsers, addLion, deleteLast, retry } = useLions();
  const { show, form, fillLoading, toggle, close, handleChange, isValid, buildLion, randomFill } = useForm();

  const [filter, setFilter] = useState('all');
  const [sort, setSort] = useState('latest');
  const [search, setSearch] = useState('');

  const displayed = filterAndSort(lions, filter, sort, search);

  // ESC 키로 폼 닫기
  useEffect(() => {
    function handleKeyDown(e) {
      if (e.key === 'Escape') close();
    }
    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
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
      <Header />
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
      <OptionsSection
        filter={filter}
        sort={sort}
        search={search}
        onFilterChange={setFilter}
        onSortChange={setSort}
        onSearchChange={setSearch}
      />
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
        <DetailList lions={displayed} />
      </main>
      <Footer />
    </>
  );
}

export default App;
